import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PostgresAdapter } from "@/lib/auth/postgres-adapter";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

// Define the database user type
interface DbUser {
  user_id: number;
  email: string;
  email_verified: Date | null;
  password_hash: string;
  name: string | null;
  created_at: Date;
  updated_at: Date;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          // Find user by email
          const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [credentials.email]
          );
          if (result.rowCount === 0) {
            return null;
          }

          // Explicitly type the user from the database
          const user = result.rows[0] as DbUser;

          // ADD THE CONSOLE.LOG STATEMENTS RIGHT HERE
          console.log("Type:", typeof user.password_hash);
          console.log("Value:", user.password_hash);

          // Check if password_hash exists
          if (!user.password_hash) {
            return null;
          }

          try {
            // Use a try/catch block around the bcrypt.compare call
            // Use TypeScript ignore directive to bypass the type checking for this line
            const passwordMatch = await bcrypt.compare(
              credentials.password as string,
              String(user.password_hash)
            );

            if (!passwordMatch) {
              return null;
            }

            // Return user object without password
            return {
              id: user.user_id.toString(),
              name: user.name || undefined,
              email: user.email,
              emailVerified: user.email_verified,
              image: null,
            };
          } catch (bcryptError) {
            console.error("bcrypt error:", bcryptError);
            return null;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
