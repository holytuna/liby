import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

try {
    await pool.query("SELECT 1");
    console.log("Database connected successfully");
} catch (error: any) {
    console.error("Database connection failed:", error.message);
}

export default pool;