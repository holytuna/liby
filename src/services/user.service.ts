import type { User } from "../models/user.model.js";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getUsers() {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
}

export async function getUserById(id: number){
  const result = await pool.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [id]);
  return result.rows[0];
}

export async function createUser(name: string, email: string, password: string) {
  
  const encryptPassword = await bcrypt.hash(password, 10) 
  const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email" , [name, email, encryptPassword])
  return result.rows[0];
}
export async function loginUser(email: string, password: string){
  const result = await pool.query("SELECT id, name, email, password FROM users WHERE email = $1", [email])
  if(result.rowCount == 0){
    throw new Error("no user found")
  }
  const userPassword = result.rows[0].password
  const encryptPassword = await bcrypt.hash(password, 10)
 
  const isPasswordCorrect = await bcrypt.compare(password, userPassword);
  if(!isPasswordCorrect){
    throw new Error("Password incorrect")
  }
  const token = jwt.sign(
  {
    id: result.rows[0].id,
    email: email
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "1h"
  }
);

return {
  user: {
      id: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email
    },
    token
  };
}

export async function deleteUser(id: number) {
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id, name, email",[id])
  if (result.rowCount == 0 ){
    throw new Error ("User Not Found")
  }
  return result
}

export async function updateUser(id: number, name: string, email: string) {
  const result = await pool.query("UPDATE users SET name = $2, email = $3 WHERE id = $1 RETURNING id, name , email", [id,name,email] )
  if (result.rows.length == 0 ){
    throw new Error ("User Not Found")
  }
  return result.rows[0]
}

