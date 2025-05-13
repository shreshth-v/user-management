import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err.message);
      process.exit(1);
    }
    console.log("Connected to Railway MySQL database.");
  });
};

export { db, connectDB };
