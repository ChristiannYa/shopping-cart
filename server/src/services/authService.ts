import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { User, JwtPayload } from "../lib/definitions";
import { selectUserByEmailQuery } from "../repositories/usersRepository";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export const authService = {
  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string } | null> {
    try {
      const result = await pool.query(selectUserByEmailQuery, [email]);
      const user = result.rows[0];

      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!isPasswordValid) {
        return null;
      }

      // Do not provide sensitive information in the token
      const token = jwt.sign(
        {
          userId: user.user_id,
          email: user.email,
          name: user.name,
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Return user data without password and token
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword as User,
        token,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Authentication failed");
    }
  },

  verifyToken(token: string): User | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const user: User = {
        user_id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        email_verified: null,
        created_at: "",
      };
      return user;
    } catch (error) {
      console.error("Token verification error:", error);
      return null;
    }
  },
};
