import axios from 'axios';
import { REACT_APP_SERVER_DOMAIN } from '@env';

// Example function to handle signup:
export async function registerUser(userData) {
  const API_URL = `${REACT_APP_SERVER_DOMAIN}/posts`; // Example API endpoint

  const response = await axios.post(API_URL, userData);
  return response.data;
}

// Example function to handle login:
export async function loginUser(userData) {
  const API_URL = `${REACT_APP_SERVER_DOMAIN}/login`; // Example API endpoint

  const response = await axios.post(API_URL, userData);
  return response.data;
}