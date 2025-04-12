import { Request, Response } from "express";
import { authService } from "../services/authService";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const result = await authService.login(email, password);

    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.json({
      user: result.user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
