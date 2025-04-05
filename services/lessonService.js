import axios from "axios";
import { REACT_APP_SERVER_DOMAIN } from "@env";

export const fetchLessons = async (filters, token) => {
  try {
    const response = await axios.post(
      `${REACT_APP_SERVER_DOMAIN}/lessons/search`,
      filters,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("שגיאה בשליפת שיעורים מהשרת:", error);
    throw new Error("לא ניתן לטעון שיעורים מהשרת כרגע.");
  }
};
/**
 * יצירת שיעור חדש ע"י מנטור
 * @param {object} lessonData - נתוני השיעור
 * @param {string} token - טוקן לאימות
 */
// export const createLesson = async (lessonData, token) => {
//   const res = await axios.post(`${BASE_URL}/lessons/create`, lessonData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// };

/**
 * חיפוש שיעורים לפי נושא, כיתה והקבצה
 * @param {object} queryParams - subject, grade, group
 * @param {string} token - טוקן לאימות
 */
// export const searchLessons = async (queryParams, token) => {
//   const res = await axios.get(`${BASE_URL}/lessons/search`, {
//     headers: { Authorization: `Bearer ${token}` },
//     params: queryParams,
//   });
//   return res.data;
// };
