import express from 'express';
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";
import pool from "./db.js";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message : "Hello World!" });
});

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log("running on port " + PORT);
});