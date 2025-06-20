import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn, signOut, refreshAccessToken } from "../services/authService"; // Auth service functions to log in and refresh token
import { setAuthHelpers } from "@services/axiosInstance";
import { router } from "expo-router";

// TODO REFRESH ACCESS TOKEN - NNEDS TO BE IMPLEMENTED IN AUTH SERVICE ??

// Create the AuthContext so we can provide and consume auth state throughout the app
const AuthContext = createContext();
/**
 * useAuth: Custom hook to allow easy access to the auth context from any component
 * Usage: const { user, login, logout, refresh, isAuthenticated } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);
/**
 * AuthProvider: This component wraps around your app (or part of it)
 * and provides authentication-related data and functions to its children.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the user object after login
  const [accessToken, setAccessToken] = useState(null); // Store the short-lived access token
  const [loading, setLoading] = useState(true); // Used to prevent rendering before auth is checked

  /**
   * This runs once on app startup and attempts to restore saved user and token
   * from AsyncStorage to keep the user logged in across sessions.
   */
  useEffect(() => {
    const initAuth = async () => {
      try {

        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("accessToken");
        // If we have both user and token, restore them to state
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setAccessToken(storedToken);

        }
      } catch (error) {
        console.error("Failed to load auth state:", error);
      } finally {
        setLoading(false);
        // Inject helper functions into axiosInstance
        setAuthHelpers({
          getTokenFn: async () => {
            const tokenFromMemory = accessToken;
            const tokenFromStorage = await AsyncStorage.getItem("accessToken");
            return tokenFromMemory || tokenFromStorage;
          },
          refreshFn: refresh,
          logoutFn: logout,
        }); // Mark loading complete whether successful or not
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * login: Attempts to authenticate the user with provided credentials.
   * On success, it saves the user info, access token, and refresh token to both state and storage.
   */
  const login = async (credentials) => {
    const { user, accessToken, refreshToken } = await signIn(credentials);
    if (!user || !accessToken || !refreshToken) {
      throw new Error("Login failed: missing tokens or user info.");
    }

    setUser(user);
    setAccessToken(accessToken);

    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  };

  /**
   * logout: Clears both state and storage to fully log the user out.
   * This can be triggered manually or automatically if something goes wrong (e.g., token expired).
   */
  const logout = async () => {
    try {
      if (user?._id) {
        await signOut(user._id);
      }
    } catch (error) {
      console.warn("Failed to notify backend on logout:", error.message);
      // Optional: Still log out locally even if the request fails
    }

    // Clear client-side state and storage
    setUser(null);
    setAccessToken(null);
    await AsyncStorage.multiRemove(["user", "accessToken", "refreshToken"]);
    console.log("✅ Auth state cleared. Redirecting to sign-in...");
    router.replace("/sign-in"); // 👈 This is the key line
  };

  /**
   * refresh: Attempts to get a new access token using the saved refresh token.
   * If it succeeds, it updates the access token. If it fails, the user is logged out.
   * This is typically called automatically before an API call if the token is expired.
   */
  const refresh = async () => {
    try {
      const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
      if (!storedRefreshToken) throw new Error("No refresh token found");

      // Request a new access token using the refresh token
      const { accessToken: newToken, refreshToken: newRefreshToken } = await refreshAccessToken(storedRefreshToken);

      console.log("✅ Frontend received new accessToken:", newToken?.slice(0, 10));
      console.log("✅ Frontend received new refreshToken:", newRefreshToken?.slice(0, 10));

      if (!newToken || !newRefreshToken) throw new Error("Missing token(s)");

      // Update state and storage with the new access token
      setAccessToken(newToken);
      await AsyncStorage.setItem("accessToken", newToken);
      await AsyncStorage.setItem("refreshToken", newRefreshToken);
      console.log("📦 Refresh function completed");

    } catch (err) {
      console.error("Token refresh failed:", err.message);
      logout(); // Force logout if refresh fails (e.g., refresh token is expired or invalid)
    }
  };

  /**
   * Value that will be available to any component using useAuth()
   */
  const value = {
    user, // Current logged-in user object
    accessToken, // Current valid access token
    login, // Function to log in
    logout, // Function to log out
    refresh, // Function to refresh the access token
    loading, // Whether the auth state is still initializing
    isAuthenticated: !!user, // True if the user is logged in
  };

  // Provide the value to all children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
