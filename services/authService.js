import axios from 'axios';
import { REACT_APP_SERVER_DOMAIN } from '@env';

/**
 * Handles errors from Axios requests
 * @param {Object} error - The error object from Axios
 */
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status code outside 2xx
    throw new Error(error.response.data.message || 'A server error occurred. Please try again.');
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
 * @returns {Promise<Object>} API response data
 */
export async function signIn(credentials) {
  // const API_URL = `${REACT_APP_SERVER_DOMAIN}/users`; // dummy
  const API_URL = `${REACT_APP_SERVER_DOMAIN}/auth/login`; // ✅ Corrected endpoint
  // TODO - Replace mock response with real backend connection
  try {
    // Simulate a network delay (optional)
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock success response
    // return {
    //   success: true,
    //   message: "Sign-in successful",
    //   token: "mock-jwt-token-12345",
    //   user: {
    //     id: "user123",
    //     email: credentials.email,
    //     firstName: "John",
    //     lastName: "Doe"
    //   }
    // };

    // Uncomment when backend is ready
    const response = await axios.post(API_URL, credentials);
    return response.data;

  } catch (error) {
    handleError(error); // ✅ Consistent error handling
  }

  // Uncomment when backend is ready
  // try {
  //   const response = await axios.post(API_URL, credentials);
  //   return response.data;
  // } catch (error) {
  //   handleError(error); // ✅ Consistent error handling
  // }
}

/**
 * User Registration
 * @param {Object} userData - { firstName, lastName, email, password }
 * @returns {Promise<Object>} API response data
 */
export async function registerUser(userData) {
  // const API_URL = `${REACT_APP_SERVER_DOMAIN}/posts`; // dummy
  const API_URL = `${REACT_APP_SERVER_DOMAIN}/auth/register`; // ✅ Corrected endpoint

  try {
    console.log(API_URL);
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    handleError(error); // Consistent error handling
  }
}
