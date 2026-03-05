import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDB } from "./db.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password required"
      });
    }

    const db = await getDB();

  const user = await db.get(
  "SELECT * FROM users WHERE username = ?",
  [username]
);
    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "clinic_secret",
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (error) {

    return res.status(500).json({
      message: "Login failed",
      error: error.message
    });

  }
}