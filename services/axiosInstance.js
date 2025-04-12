import axios from "axios";
import { EXPO_PUBLIC_SERVER_URL } from "@env";

const instance = axios.create({
  baseURL: EXPO_PUBLIC_SERVER_URL,
});

let getToken = null;
let refresh = null;
let logout = null;

//Called by AuthContext to provide helper access
export const setAuthHelpers = ({ getTokenFn, refreshFn, logoutFn }) => {
  getToken = getTokenFn;
  refresh = refreshFn;
  logout = logoutFn;
};

/**
 * Request Interceptor - Attach token to every request
 */
instance.interceptors.request.use(
  async (config) => {
    if (!getToken)  {
        console.warn("⚠️ getToken function is not set — skipping token attachment");
        return config;
    }

    const token = await getToken();
    if (token) {
        console.log("🔐 Attaching token:", token.slice(0, 10) + "..."); // short log
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("⚠️ No token found — skipping auth header");
    }

    return config;
  },
  (error) => Promise.reject(error)
);


/**
 * Response Interceptor - Handle 403 (expired token)
 */
instance.interceptors.response.use(
    (response) => response, // ✅ Return successful responses as-is
  
    async (error) => {
      const originalRequest = error.config;
  
      // Prevent infinite refresh loops
      const isTokenExpired = error.response?.status === 403;
      const isTokenInvalid = error.response?.status === 401;
  
      if (isTokenExpired && !originalRequest._retry && refresh) {
        originalRequest._retry = true;
  
        try {
          console.log("🔁 Token expired. Attempting refresh...");
          await refresh(); // 🔄 Try to refresh access token
          console.log("📦 Refresh function completed");

          const newToken = await getToken();
          console.log("✅ Refresh successful. New token:", newToken?.slice(0, 10) + "...");
  
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            console.log("🔁 Retrying original request...");
            return instance(originalRequest); // 🔁 Retry original request with new token
          }
        } catch (refreshError) {
          console.error("🔴 Token refresh failed:", refreshError);
          if (logout) {
            console.warn("🚪 Logging out after failed refresh...");
            await logout();
          }
        }
      }
  
      if (isTokenInvalid && logout) {
        console.warn("🚪 Invalid token – calling logout()");
        await logout();
      }
  
      return Promise.reject(error); // ❌ Forward error if not handled
    }
  );

export default instance;
