import { Response } from "express";
import pool from "../config/db";
import { AuthRequest } from "../middlewares/auth";
import { selectUserByIdQuery } from "../repositories/usersRepository";

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    // user_id comes from the authenticated request
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const result = await pool.query(selectUserByIdQuery, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
