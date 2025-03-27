import axios from 'axios';
import { REACT_APP_SERVER_DOMAIN } from '@env';

const BASE_URL = `${REACT_APP_SERVER_DOMAIN}/auth`;

/**
 * Handles errors from Axios requests
 * @param {Object} error - The error object from Axios
 */
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status code outside 2xx
    throw new Error(error.response.data.error || 'A server error occurred. Please try again.');
  } else if (error.request) {
    // No response from server
    throw new Error('No response from the server. Please check your internet connection.');
  } else {
    // Error setting up the request
    throw new Error('An unexpected error. Please try again.');
  }
};

/**
 * User Sign In
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} { user, accessToken, refreshToken }
 */
export async function signIn(credentials) {
  const API_URL = `${BASE_URL}/login`; // ✅ Corrected endpoint
  try {
    const response = await axios.post(API_URL, credentials);
    // console.log(API_URL)
    return response.data;
  } catch (error) {
    handleError(error); // ✅ Consistent error handling
  }
}

/**
 * User Registration
 * @param {Object} userData - { firstName, lastName, email, password }
 * @returns {Promise<Object>} { user, accessToken, refreshToken }
 */
export async function registerUser(userData) {
  const API_URL = `${BASE_URL}/register`; // ✅ Corrected endpoint
  try {
    // console.log(API_URL);
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    handleError(error); // Consistent error handling
  }
}

/**
 * Request a password reset code to be sent to the user's email.
 * @param {string} email
 * @returns {Promise<Object>} { message }
 */
export async function resetPassword(email) {
  const API_URL = `${BASE_URL}/forgot-password`;
  try {
    const response = await axios.post(API_URL, { email });
    return {
      success: true,
      message: response.data.message
    };
  } catch (error) {
    handleError(error);
    return {
      success: false,
      message: error.message || "Something went wrong"
    };
  }
}

export async function verifyResetCode(email, resetCode) {
  const API_URL = `${BASE_URL}/verify-reset-code`;
  try {
    const response = await axios.post(API_URL, { email, resetCode });
    return {
      success: true,
      tempToken: response.data.tempToken,
      message: response.data.message,
    };
  } catch (error) {
    handleError(error);
    return { success: false, message: error.message || 'Failed to verify reset code' };
  }

}
export async function updatePassword(tempToken, newPassword, confirmPassword) {
  const API_URL = `${BASE_URL}/update-password`;
  try {
    const response = await axios.patch(API_URL, { tempToken, newPassword, confirmPassword });
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    handleError(error);
    return { success: false, message: error.message || 'Failed to update password' };
  }
}

/**
 * User Sign Out
 * @param {string} userId - ID of the user to log out
 * @returns {Promise<Object>} API response
 */
export async function signOut(userId) {
  const API_URL = `${BASE_URL}/logout`; // Adjust endpoint if needed
  console.log(API_URL)
  try {
    const response = await axios.post(API_URL, { user_id: userId });
    return response;
  } catch (error) {
    handleError(error);
  }
}