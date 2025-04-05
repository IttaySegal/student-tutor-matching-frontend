import axios from "axios";
import { REACT_APP_SERVER_DOMAIN } from "@env";

/**
 * @param {string} accessToken 
 *  * @returns {Promise<Object>}
 */
export const getAggregateHomeData = async (accessToken) => {
  try {
    const response = await axios.get(`${REACT_APP_SERVER_DOMAIN}/home/data`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("שגיאה בעת בקשת מידע למסך הבית:", error);
    throw error;
  }
};
