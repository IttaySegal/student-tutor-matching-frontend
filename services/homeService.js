import axios from "@services/axiosInstance";
// import { REACT_APP_SERVER_DOMAIN } from "@env";
import { EXPO_PUBLIC_SERVER_URL } from "@env";
import { transformToFrontendFormat } from "@services/lessonService";

/**
 * @param {string} accessToken
 *  * @returns {Promise<Object>}
 */
export const getAggregateHomeData = async (accessToken) => {
  console.log("📡 Fetching home data from /home/data");
  try {
    // const response = await axios.get(`${REACT_APP_SERVER_DOMAIN}/home/data`, {
    const response = await axios.get(`${EXPO_PUBLIC_SERVER_URL}/home/data`);
    const data = response.data;

    // Convert nextLesson if it exists
    if (data.nextLesson) {
      data.nextLesson = transformToFrontendFormat(data.nextLesson);
    }

    return data;
  } catch (error) {
    console.error("Home Page Error", error);
    throw error;
  }
};

export const fetchPieChartData = async () => {
  const response = await axios.get(`${EXPO_PUBLIC_SERVER_URL}/lesson-grade-distribution`);
  return response.data;
};