import { db } from "../config/db.js";

// Register a new user
export const registerUser = (user, callback) => {
  const { firstName, lastName, email, password, role, verificationToken } =
    user;
  const query = `
    INSERT INTO users (first_name, last_name, email, password, role, verification_token) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [firstName, lastName, email, password, role, verificationToken],
    callback
  );
};

// Find user by email
export const findUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], callback);
};

// Verify user email
export const verifyUserEmail = (token, callback) => {
  const query = `
    UPDATE users 
    SET email_verified = 1, verification_token = NULL 
    WHERE verification_token = ?
  `;
  db.query(query, [token], callback);
};
