import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const query =
      "SELECT id, first_name, last_name, email, role, email_verified FROM users WHERE id = ?";
    db.query(query, [decoded.id], (err, result) => {
      if (err || result.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = result[0];
      next();
    });
  });
};

export default verifyToken;
