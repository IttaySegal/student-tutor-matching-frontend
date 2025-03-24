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
  const API_URL = `${REACT_APP_SERVER_DOMAIN}/auth/login`; // ✅ Corrected endpoint
  try {
    const response = await axios.post(API_URL, credentials);
    console.log(API_URL)
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
  const API_URL = `${BASE_URL}/auth/register`; // ✅ Corrected endpoint
  try {
    // console.log(API_URL);
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    handleError(error); // Consistent error handling
  }
}
