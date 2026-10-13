import type { Request, Response } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
} from "../services/user.service.js";

export async function getUsersController(
  req: Request,
  res: Response
) {
  const users = await getUsers();

  res.json(users);
}

export async function getUserController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const user = await getUserById(id);

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  res.json(user);
}

export async function createUserController(
  req: Request,
  res: Response
) {
  try {
    const { name, email, password } = req.body;
    validateUser(name, email,password)
    const user = await createUser(name, email, password);
    
    res.status(201).json(user);
  } catch(error : any){
    res.status(400).json({message: error.message})
  }
}

export async function loginUserController(
  req: Request,
  res: Response
){
  try{
    const {email, password} = req.body;
    const user = await loginUser(email, password);
    // if (loginUser(email, password)){
      res.status(200).json({message: "Login sucessful", token: user.token, user: user.user
    })
    
  }catch (error: any){
    res.status(400).json({message: error.message})
  }
}

export async function deleteUserController(
  req: Request,
  res: Response
) {
  try{
    const id = Number(req.params.id);
    const deletedUser = await deleteUser(id);
    res.status(200).json({
      message: "User has been deleted",
      user: deletedUser
    })
  }catch(error : any){
    res.status(404).json({message: error.message})
  }
  
}

export async function updateUserController(
  req: Request,
  res: Response,
){
  try{
  const id = Number(req.params.id);
    
    const { name, email } = req.body;
    validateUser(name, email, "11111111")
    const changed = await updateUser(id, name, email);
     res.status(200).json({
    message: "User has been updated",
    user: changed
  })
  } catch(error : any){
    res.status(400).json({message: error.message})
  }
}

function validateUser(name: any ,email: any, password: any){
  if (typeof name !== "string" || name.trim() === '') {
        throw new Error("Name is required");
    }
    if (typeof password !== "string" || password.trim() === '') {
        throw new Error("Password is required");
    }
    if (password.length < 8){
        throw new Error("Password must have at least 8 characters")
      }
    if (typeof email !== "string" || email.trim() === '') {
        throw new Error("Email is required");
    }
    if (!email.includes("@")){
        throw new Error("Invalid Email")
    }
}