import axios from 'axios';
import { REACT_APP_SERVER_DOMAIN } from '@env';


/**
 * User Sign In
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} API response data
 */
export async function signIn(email, password) {
  const API_URL = `${REACT_APP_SERVER_DOMAIN}/posts`; // Example API endpoint
  // const API_URL = `${REACT_APP_SERVER_DOMAIN}/auth/signin`; // ✅ Adjusted endpoint

  try {
    const response = await axios.post(API_URL, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to sign in. Please try again.'
    );
  }
}


/**
 * User Registration
 * @param {Object} userData - User's registration data
 * @returns {Promise<Object>} API response data
 */
export async function registerUser(userData) {
  const API_URL = `${REACT_APP_SERVER_DOMAIN}/posts`; // Example API endpoint
  // const API_URL = `${REACT_APP_SERVER_DOMAIN}/auth/signup`; // ✅ Adjusted endpoint  

  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to register. Please try again.'
    );
  }
}
