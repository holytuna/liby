import type { AuthRequest } from "../middleware/authMiddleware.js";
import type { Response } from "express";
import { publishBook } from "../services/book.service.js";

export async function publishBookController(
    req: AuthRequest,
    res: Response
) {
    try {
        const user_id = req.user?.id;
        
        if (!user_id) {
            throw new Error("Unauthorized");
        }
        const { title, genre, intro } = req.body;
        validateBook(title, genre, intro)
        const book = await publishBook(title, genre, intro, user_id);
        
        res.status(201).json(book);
      } catch(error : any){
        res.status(400).json({message: error.message})
      }
}

function validateBook(title: any ,genre: any, password: any){
    
  if (typeof title !== "string" || title.trim() === '') {
        throw new Error("title is required");
    }
    if (typeof password !== "string" || password.trim() === '') {
        throw new Error("Password is required");
    }
    if (password.length < 8){
        throw new Error("Password must have at least 8 characters")
      }
    if (typeof genre !== "string" || genre.trim() === '') {
        throw new Error("genre is required");
    }
    // if (!genres.includes(genre)){
    //     throw new Error("Invalid genre")
    // }
}
