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
 * Response Interceptor - Handle various error cases
 */
instance.interceptors.response.use(
    (response) => {
      // Handle successful responses
      const { data } = response;
      
      // If the response has a success flag and it's false
      if (data.success === false) {
        const errorMessage = data.message || data.error || "Operation failed";
        console.error("❌ Operation failed:", errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
      
      return response;
    },
  
    async (error) => {
      const originalRequest = error.config;
  
      // Handle validation errors (400)
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        
        // Check if it's a validation error with field details
        if (errorData.details?.fields) {
          // Format field-specific errors into a single message
          const fieldErrors = Object.entries(errorData.details.fields)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('; ');
          
          console.error("🔍 Validation errors:", fieldErrors);
          return Promise.reject(new Error(fieldErrors));
        }
        
        // If it's a simple error message
        const errorMessage = errorData.error || errorData.message || "Validation error";
        console.error("🔍 Validation error:", errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
  
      // Handle token expiration (403)
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
  
      // Handle other errors
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "An unexpected error occurred";
      console.error("❌ Request failed:", errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
  );

export default instance;
