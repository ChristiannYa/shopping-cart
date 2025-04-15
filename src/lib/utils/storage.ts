/**
 * Utility functions for safely working with localStorage in Next.js
 * Handles server-side rendering gracefully by checking for window
 * to ensure the code runs in the browser environment, not during
 * server-side rendering.
 */
export const storage = {
  /**
   * Get an item from localStorage
   * @param key - The key to retrieve
   * @param defaultValue - Optional default value if key doesn't exist
   * @returns The stored value or defaultValue if not found or on server
   */
  get: (key: string, defaultValue: string | null = null): string | null => {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    return localStorage.getItem(key) || defaultValue;
  },

  /**
   * Set an item in localStorage
   * @param key - The key to set
   * @param value - The value to stoer
   * @returns true if successful, false if on server
   */
  set: (key: string, value: string): boolean => {
    if (typeof window === "undefined") {
      return false;
    }
    localStorage.setItem(key, value);
    return true;
  },

  /**
   * Remove an item from localStorage
   * @param key - The key to remove
   * @returns true if successful, false if on server
   */
  remove: (key: string): boolean => {
    if (typeof window === "undefined") {
      return false;
    }
    localStorage.removeItem(key);
    return true;
  },

  /**
   * Check if a boolean flag is true in localStorage
   * @param key - The key to check
   * @returns true if the stored value is 'true', false otherwise or on server
   */
  getFlag: (key: string): boolean => {
    return storage.get(key) === "true";
  },

  /**
   * Set a boolean flag in localStorage
   * @param key - The key to set
   * @param value - The boolean value to store
   * @returns true if successful, false if on server
   */
  setFlag: (key: string, value: boolean): boolean => {
    return storage.set(key, value.toString());
  },
};
