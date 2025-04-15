import axios from "@services/axiosInstance";
import { EXPO_PUBLIC_SERVER_URL } from '@env';

const BASE_URL = `${EXPO_PUBLIC_SERVER_URL}/lessons`;

const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});


// Helper function to convert ISO to our frontend format
const convertFromISO = (isoDate) => {
  const date = new Date(isoDate);
  return {
    date: date.toLocaleDateString('en-GB'), // YYYY-MM-DD format
    day: date.toLocaleDateString('en-US', { weekday: 'long' }),
    startTime: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date(date.getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

// Helper function to convert our frontend format to ISO
const convertToISO = (date, startTime) => {
  return new Date(`${date}T${startTime}`).toISOString();
};

// Helper function to transform frontend payload to backend format
const transformToBackendFormat = (lessonData) => {
  const { 
    subject,
    grade,
    description,
    location,
    date,
    startTime,
    // ... any other fields we want to keep
  } = lessonData;

  return {
    subject,
    grade,
    description,
    location,
    dateTime: convertToISO(date, startTime)
  };
};

// Helper function to transform backend response to frontend format
const transformToFrontendFormat = (lessonData) => {
  const {
    id,
    subject,
    grade,
    description,
    location,
    dateTime,
    status,
    student,
    mentor,
    // ... any other fields we want to keep
  } = lessonData;

  return {
    id,
    subject,
    grade,
    description,
    location,
    status,
    student,
    mentor,
    ...convertFromISO(dateTime)
  };
};

/* =========================
   Search & Discovery
========================= */

export const searchLessons = async (filters) => {
  try {
    const res = await axios.post(`${BASE_URL}/search`, filters);
    return res.data.map(lesson => transformToFrontendFormat(lesson));
    // return res.data;
  } catch (err) {
    console.error("Error searching lessons:", err);
    throw new Error("Failed to search lessons.");
  }
};

export const getLessonById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    // return res.data;
    return transformToFrontendFormat(res.data);
  } catch (err) {
    console.error("Error fetching lesson:", err);
    throw new Error("Failed to get lesson.");
  }
};

/* =========================
   Mentor Actions
========================= */

export const getLessonsByUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/mentor/my-lessons`);
    return res.data.map(lesson => transformToFrontendFormat(lesson));
    // return res.data;
  } catch (err) {
    console.error("Error fetching mentor lessons:", err);
    throw new Error("Failed to fetch mentor lessons.");
  }
};

export const createLesson = async (lessonData) => {
  try {
    const payload = transformToBackendFormat(lessonData);
    const res = await axios.post(`${BASE_URL}/create`, payload);
    // const res = await axios.post(`${BASE_URL}/create`, lessonData);

    return transformToFrontendFormat(res.data);
    // return res.data;
  } catch (err) {
    console.error("Error creating lesson:", err);
    throw new Error("Failed to create lesson.");
  }
};

export const updateLesson = async (id, lessonData) => {
  try {
    // const res = await axios.put(`${BASE_URL}/update/${id}`, lessonData);
    // return res.data;
    const payload = transformToBackendFormat(lessonData);
    const res = await axios.put(`${BASE_URL}/update/${id}`, payload);
    return transformToFrontendFormat(res.data);
  } catch (err) {
    console.error("Error updating lesson:", err);
    throw new Error("Failed to update lesson.");
  }
};

export const deleteLesson = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${id}`);
  } catch (err) {
    console.error("Error deleting lesson:", err);
    throw new Error("Failed to delete lesson.");
  }
};

export const getUpcomingLessons = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/mentor/upcoming`);
    return res.data.map(lesson => transformToFrontendFormat(lesson));

    // return res.data;
  } catch (err) {
    console.error("Error fetching upcoming lessons:", err);
    throw new Error("Failed to fetch upcoming lessons.");
  }
};

export const getLessonCount = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/mentor/lesson-count`);
    return res.data;
  } catch (err) {
    console.error("Error fetching lesson count:", err);
    throw new Error("Failed to fetch lesson count.");
  }
};

export const getNextLesson = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/mentor/next`);
    // return res.data;
    return transformToFrontendFormat(res.data);

  } catch (err) {
    console.error("Error fetching next lesson:", err);
    throw new Error("Failed to fetch next lesson.");
  }
};

export const submitMentorReview = async (lessonId, reviewData) => {
  try {
    const res = await axios.post(`${BASE_URL}/mentor/review/${lessonId}`, reviewData);
    return res.data;
  } catch (err) {
    console.error("Error submitting mentor review:", err);
    throw new Error("Failed to submit mentor review.");
  }
};

export const fetchUnresolvedMentorReview = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/mentor/review`);
    return res.data;
  } catch (err) {
    console.error("Error getting mentor review:", err);
    throw new Error("Failed to get mentor review.");
  }
};

/* =========================
  Student Actions
========================= */

export const getStudentLessons = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/student/my-lessons`);
    // return res.data;
    return res.data.map(lesson => transformToFrontendFormat(lesson));

  } catch (err) {
    console.error("Error fetching student lessons:", err);
    throw new Error("Failed to fetch student lessons.");
  }
};

export const getStudentNextLesson = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/student/next`, authHeaders(token));
    // return res.data;
    return transformToFrontendFormat(res.data);

  } catch (err) {
    console.error("Error fetching next student lesson:", err);
    throw new Error("Failed to fetch next student lesson.");
  }
};

export const getStudentLastLesson = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/student/last`);
    // return res.data;
    return transformToFrontendFormat(res.data);

  } catch (err) {
    console.error("Error fetching last student lesson:", err);
    throw new Error("Failed to fetch last student lesson.");
  }
};

export const registerToLesson = async (lessonId) => {//TODO
  try {
    const res = await axios.post(`${BASE_URL}/student/register/${lessonId}`, {});
    return res.data;
  } catch (err) {
    console.error("Error registering to lesson:", err);
    throw new Error("Failed to register to lesson.");
  }
};

export const unregisterFromLesson = async (lessonId) => {
  try {
    const res = await axios.post(`${BASE_URL}/student/unregister/${lessonId}`, {});
    return res.data;
  } catch (err) {
    console.error("Error unregistering from lesson:", err);
    throw new Error("Failed to unregister from lesson.");
  }
};

export const submitStudentReview = async (lessonId, reviewData) => {
  try {
    console.log("📝 Submitting student review:", { lessonId, reviewData });
    const res = await axios.post(`${BASE_URL}/lessons/${lessonId}/student-review`, reviewData);
    return res.data;
  } catch (err) {
    console.error("Error submitting student review:", err);
    throw new Error("Failed to submit student review.");
  }
};

/* =========================
   Admin Actions
========================= */

export const getAllLessons = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/all`);
    // return res.data;
    return res.data.map(lesson => transformToFrontendFormat(lesson));
  } catch (err) {
    console.error("Error fetching all lessons:", err);
    throw new Error("Failed to fetch all lessons.");
  }
};

export const approveLesson = async (lessonId) => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/approve/${lessonId}`, {});
    return res.data;
  } catch (err) {
    console.error("Error approving lesson:", err);
    throw new Error("Failed to approve lesson.");
  }
};

export const rejectLesson = async (lessonId) => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/reject/${lessonId}`, {});
    return res.data;
  } catch (err) {
    console.error("Error rejecting lesson:", err);
    throw new Error("Failed to reject lesson.");
  }
};

export const getPendingReviews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/pending-reviews`);
    return res.data;
  } catch (err) {
    console.error("Error fetching pending reviews:", err);
    throw new Error("Failed to fetch pending reviews.");
  }
};
