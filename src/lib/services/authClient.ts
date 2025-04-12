// Handle low-level HTTP requests and authentication headers.

const API_URL = "http://localhost:5000/api";

export const authClient = {
  /**
   * Perform an authenticated GET request
   *
   * @param endpoint - The API endpoint to request (without the base URL).
   * @returns A promise that resolves to the JSON response data.
   * @throws An error if the request fails or returns a non-2xx status code.
   */
  async get(endpoint: string) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401 && endpoint.includes("/user")) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Perform an authenticated POST request to the API with JSON data
   *
   * @param endpoint - The API endpoint to request (without the base URL).
   * @param data - The data to send in the request body, which will be JSON-serialized.
   * @returns A promise that resolves to the JSON response data.
   * @throws An error if the request fails or returns a non-2xx status code.
   */
  async post<T>(endpoint: string, data: T) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  },
};
