import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "@auth/core/adapters";
import pool from "../db";

export function PostgresAdapter(): Adapter {
  return {
    /**
     * Creates a user in the database and returns it.
     *
     * Omit the id property from the user object because it's generated by the database.
     * Return image as null since we don't have this column in the database.
     */
    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      const { name, email, emailVerified } = user;
      const now = new Date();

      const result = await pool.query(
        `INSERT INTO users (name, email, email_verified, password_hash, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING user_id, name, email, email_verified`,
        [
          name,
          email,
          emailVerified,
          "", // Empty password_hash for OAuth users (would be set properly for credential users)
          now, // Set created_at to current timestamp
          now, // Set updated_at to same timestamp initially
        ]
      );

      return {
        id: result.rows[0].user_id.toString(),
        name: result.rows[0].name,
        email: result.rows[0].email,
        emailVerified: result.rows[0].email_verified,
        image: null,
      };
    },

    /**
     * Returns a user from the database by their ID
     *
     * @param id - The user ID to look up
     * @returns The user object if found, null otherwise
     * Return image as null since we don't have this column in the database.
     */
    async getUser(id: string): Promise<AdapterUser | null> {
      const result = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );

      if (result.rowCount === 0) return null;

      return {
        id: result.rows[0].user_id.toString(),
        name: result.rows[0].name,
        email: result.rows[0].email,
        emailVerified: result.rows[0].email_verified,
        image: null,
      };
    },

    /**
     * Returns a user from the databaase by theit email
     *
     * @param email - The email address to look up
     * @returns The user object if found, null otherwise
     * Return image as null since we don't have this column in the database.
     */
    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (result.rowCount === 0) return null;

      return {
        id: result.rows[0].user_id.toString(),
        name: result.rows[0].name,
        email: result.rows[0].email,
        emailVerified: result.rows[0].email_verified,
        image: null,
      };
    },

    /**
     * Returns a user from the databse by their OAuth provider account information
     *
     * @param account - The provider account details
     * @param account.provider - The OAuth provider (e.g. "google", "github")
     * @param account.providerAccountId - The user ID from the OAuth provider
     * @returns The user object if found, null otherwise
     */
    async getUserByAccount(
      account: Pick<AdapterAccount, "provider" | "providerAccountId">
    ): Promise<AdapterUser | null> {
      const { providerAccountId, provider } = account;

      const result = await pool.query(
        `SELECT u.* 
         FROM users u
         JOIN accounts a ON u.user_id = a.user_id
         WHERE a.provider_id = $1 AND a.provider_account_id = $2`,
        [provider, providerAccountId]
      );

      if (result.rowCount === 0) return null;

      return {
        id: result.rows[0].user_id.toString(),
        name: result.rows[0].name,
        email: result.rows[0].email,
        emailVerified: result.rows[0].email_verified,
        image: null, // Return null for image since we don't have this column
      };
    },

    /**
     * Returns a user from the databvse by their email address
     *
     * @param user - The user object data to update (partial, but must include the ID)
     * @returns The user object if found, null otherwise
     * Return image as null since we don't have this column in the database.
     */
    async updateUser(
      user: Partial<AdapterUser> & Pick<AdapterUser, "id">
    ): Promise<AdapterUser> {
      const { id, name, email, emailVerified } = user;
      const now = new Date();

      const result = await pool.query(
        `UPDATE users
         SET name = $1, email = $2, email_verified = $3, updated_at = $4
         WHERE user_id = $5
         RETURNING user_id, name, email, email_verified`,
        [name, email, emailVerified, now, id]
      );

      return {
        id: result.rows[0].user_id.toString(),
        name: result.rows[0].name,
        email: result.rows[0].email,
        emailVerified: result.rows[0].email_verified,
        image: null,
      };
    },

    /**
     * Deletes a user from the databse by their ID
     *
     * @param userId - The ID of the user to delete
     * @returns Nothing (void)
     */
    async deleteUser(userId: string): Promise<void> {
      await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);
    },

    /**
     * Links an OAuth account to a user
     *
     * @param account - The account data from the OAuth provider
     * @returns The account data
     */
    async linkAccount(account: AdapterAccount): Promise<AdapterAccount> {
      await pool.query(
        `INSERT INTO accounts
         (user_id, provider_id, provider_type, provider_account_id, refresh_token, access_token, expires_at, token_type, scope, id_token)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          account.userId,
          account.provider,
          account.type,
          account.providerAccountId,
          account.refresh_token,
          account.access_token,
          account.expires_at,
          account.token_type,
          account.scope,
          account.id_token,
        ]
      );

      return account;
    },

    /**
     * Removes an OAuth account from a user
     *
     * @param providerAccount - The provider account to unlink
     * @returns Nothing (void)
     */
    async unlinkAccount(
      providerAccount: Pick<AdapterAccount, "provider" | "providerAccountId">
    ): Promise<void> {
      const { providerAccountId, provider } = providerAccount;

      await pool.query(
        "DELETE FROM accounts WHERE provider_id = $1 AND provider_account_id = $2",
        [provider, providerAccountId]
      );
    },

    /**
     * Creates a new session for a user in the databse
     *
     * @param session - The session data to store
     * @param session.sessionToken - Unique token that identifies the session
     * @param session.userId - The ID of the user associated with the session
     * @param session.expires - When the session should expire
     * @returns The created session object
     */
    async createSession(session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }): Promise<AdapterSession> {
      const { sessionToken, userId, expires } = session;

      await pool.query(
        `INSERT INTO sessions (user_id, session_token, expires)
         VALUES ($1, $2, $3)`,
        [userId, sessionToken, expires]
      );

      return {
        sessionToken,
        userId,
        expires,
      };
    },

    /**
     * Returns both the session and user data in a single database query
     * Uses a JOIN to efficiently retrieve both records at once
     *
     * @param sessionToken - The session token to look up
     * @returns The session and user objects if found, null otherwise
     */
    async getSessionAndUser(
      sessionToken: string
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      const result = await pool.query(
        `SELECT s.*, u.* 
         FROM sessions s
         JOIN users u ON s.user_id = u.user_id
         WHERE s.session_token = $1 AND s.expires > NOW()`,
        [sessionToken]
      );

      if (result.rowCount === 0) return null;

      const user: AdapterUser = {
        id: result.rows[0].user_id.toString(),
        name: result.rows[0].name,
        email: result.rows[0].email,
        emailVerified: result.rows[0].email_verified,
        image: null,
      };

      const session: AdapterSession = {
        sessionToken: result.rows[0].session_token,
        userId: result.rows[0].user_id.toString(),
        expires: result.rows[0].expires,
      };

      return { user, session };
    },

    /**
     * Updates a session's expiration time in the database
     *
     * @param session - The session with updated properties
     * @returns The updated session object if found, null otherwise
     */
    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession | null> {
      const { sessionToken, expires } = session;

      const result = await pool.query(
        `UPDATE sessions
         SET expires = $1
         WHERE session_token = $2
         RETURNING session_token, user_id, expires`,
        [expires, sessionToken]
      );

      if (result.rowCount === 0) return null;

      return {
        sessionToken: result.rows[0].session_token,
        userId: result.rows[0].user_id.toString(),
        expires: result.rows[0].expires,
      };
    },

    /**
     * Deletes a session from the database
     *
     * @param sessionToken - The token of the session to delete
     * @returns The deleted session (for logging purposes) or null if not found
     */
    async deleteSession(sessionToken: string): Promise<AdapterSession | null> {
      // First query to get the session before deletion
      const getResult = await pool.query(
        "SELECT * FROM sessions WHERE session_token = $1",
        [sessionToken]
      );

      if (getResult.rowCount === 0) return null;

      // Now delete the session
      await pool.query("DELETE FROM sessions WHERE session_token = $1", [
        sessionToken,
      ]);

      // Return the deleted session
      return {
        sessionToken: getResult.rows[0].session_token,
        userId: getResult.rows[0].user_id.toString(),
        expires: getResult.rows[0].expires,
      };
    },

    /**
     * Stores a verification token that can be used for email verification,
     * password reset, or magic link authentication.
     *
     * @param verificationToken - The verification token to store
     * @returns The created verification token object
     */
    async createVerificationToken(
      verificationToken: VerificationToken
    ): Promise<VerificationToken> {
      const { identifier, token, expires } = verificationToken;

      await pool.query(
        `INSERT INTO verification_tokens (identifier, token, expires)
     VALUES ($1, $2, $3)`,
        [identifier, token, expires]
      );

      return verificationToken;
    },

    /**
     * Finds and consumes a verification token
     * This deletes the token from the database so it can only be used once.
     *
     * @param params - The parameters to find tthe verification token
     * @param params.identifier - The identifier (usually email) associated with the token
     * @param params.token - The token string to verify
     * @returns The verification token if found, otherwise null
     */
    async useVerificationToken(params: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken | null> {
      const { identifier, token } = params;

      const result = await pool.query(
        `DELETE FROM verification_tokens
         WHERE identifier = $1 AND token = $2
         RETURNING identifier, token, expires`,
        [identifier, token]
      );

      if (result.rowCount === 0) return null;

      return {
        identifier: result.rows[0].identifier,
        token: result.rows[0].token,
        expires: result.rows[0].expires,
      };
    },
  };
}
