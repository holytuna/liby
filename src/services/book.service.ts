import pool from "../db.js";

export async function publishBook(title: string, genre: string, intro: string, author_id: number){
    const result = await pool.query("INSERT INTO books (title, genre, intro, author_id) VALUES ($1, $2, $3, $4) RETURNING title, genre, intro" , [title, genre, intro, author_id])
    return result.rows[0];
}