import { User, LoginResponse } from "@/lib/definitions";
import { authClient } from "./authClient";

export const authService = {
  /**
   * Authenticate a user with their email and password
   *
   * @param email - The user's email address
   * @param password - The user's password
   * @returns A Promise that resolves to a LoginRespionse containing
   * the user object and authenticatin token
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await authClient.post("/auth/login", { email, password });

    // Check if the response contains an error
    if (response.error) {
      return {
        error: "Login failed",
        user: null,
      };
    }

    return response;
  },

  /**
   * Fetches the currently authenticated user's information
   *
   * @returns A promise that resolves to the User object of the
   * authenticated user
   * @remarks This method relies on authClient.get which throws
   * error if the request fails or returns a non-2xx status code
   */
  async getCurrentUser(): Promise<User> {
    return authClient.get("/user/current");
  },

  /**
   * Logs out the current user by clearing the authentication cookie
   *
   * @returns A Promise that resolves to an object containing a success message
   * @remarks This method makes a POST request to the logout endpoint which
   * clears the authentication cookie on the server side
   */
  async logout(): Promise<{ message: string }> {
    const response = await authClient.post("/auth/logout", {});
    return response;
  },
};
