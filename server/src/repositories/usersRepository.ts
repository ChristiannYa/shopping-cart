// Select user by ID
export const selectUserByIdQuery = `
  SELECT user_id, email, name, email_verified, created_at 
  FROM users 
  WHERE user_id = $1
`;
