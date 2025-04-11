import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PostgresAdapter } from "@/lib/auth/postgres-adapter";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { DbUser } from "@/lib/definitions";

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
        // Check if credentials are provided
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          // Find user by email
          const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            // credentials.email replaces the $1 placeholder
            [credentials.email]
          );
          if (result.rowCount === 0) {
            return null;
          }

          // Set the type of user to DbUser
          const user = result.rows[0] as DbUser;

          // Check if password_hash exists
          if (!user.password_hash) {
            return null;
          }

          try {
            // Compare the provided password with the stored password hash
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
            // catch errors during bcrypt comparison
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
    // Use JSON Web Tokens for session instead of database sessions.
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Use custom sign in page
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // This will only be executed once on sign in
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Add id to session
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
