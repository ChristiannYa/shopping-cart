// Select user by ID
export const selectUserByIdQuery = `
  SELECT user_id, email, name, email_verified, created_at 
  FROM users 
  WHERE user_id = $1
`;

export const selectUserByEmailQuery = `
  SELECT user_id, email, name, email_verified, password_hash, created_at
  FROM users
  WHERE email = $1
`;
