import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env.local") });

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "shopping_cart",
  password: process.env.DB_PASSWORD || "your_password",
  port: parseInt(process.env.DB_PORT || "5432"),
});

export default pool;
