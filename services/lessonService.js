import axios from "@services/axiosInstance";
import { EXPO_PUBLIC_SERVER_URL } from '@env';

const BASE_URL = `${EXPO_PUBLIC_SERVER_URL}/lessons`;

const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

/* =========================
   Search & Discovery
========================= */

export const searchLessons = async (filters) => {
  try {
    const res = await axios.post(`${BASE_URL}/search`, filters);
    return res.data;
  } catch (err) {
    console.error("Error searching lessons:", err);
    throw new Error("Failed to search lessons.");
  }
};

export const getLessonById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
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
    return res.data;
  } catch (err) {
    console.error("Error fetching mentor lessons:", err);
    throw new Error("Failed to fetch mentor lessons.");
  }
};

export const createLesson = async (lessonData) => {
  try {
    const res = await axios.post(`${BASE_URL}/create`, lessonData);
    return res.data;
  } catch (err) {
    console.error("Error creating lesson:", err);
    throw new Error("Failed to create lesson.");
  }
};

export const updateLesson = async (id, lessonData) => {
  try {
    const res = await axios.put(`${BASE_URL}/update/${id}`, lessonData);
    return res.data;
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
    return res.data;
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
    return res.data;
  } catch (err) {
    console.error("Error fetching next lesson:", err);
    throw new Error("Failed to fetch next lesson.");
  }
};

/* =========================
  Student Actions
========================= */

export const getStudentLessons = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/student/my-lessons`);
    return res.data;
  } catch (err) {
    console.error("Error fetching student lessons:", err);
    throw new Error("Failed to fetch student lessons.");
  }
};

export const getStudentNextLesson = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/student/next`, authHeaders(token));
    return res.data;
  } catch (err) {
    console.error("Error fetching next student lesson:", err);
    throw new Error("Failed to fetch next student lesson.");
  }
};

export const getStudentLastLesson = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/student/last`);
    return res.data;
  } catch (err) {
    console.error("Error fetching last student lesson:", err);
    throw new Error("Failed to fetch last student lesson.");
  }
};

export const registerToLesson = async (lessonId) => {
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

/* =========================
   Admin Actions
========================= */

export const getAllLessons = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/all`);
    return res.data;
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
