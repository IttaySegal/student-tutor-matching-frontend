import React, { createContext, useContext, useState } from "react";
import * as LessonAPI from "@services/lessonService";
import { useToast } from "@context/ToastContext";

const LessonContext = createContext();

export const useLesson = () => useContext(LessonContext);

export const LessonProvider = ({ children }) => {
  // Common State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Mentor
  const [mentorLessons, setMentorLessons] = useState([]);
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [lessonCount, setLessonCount] = useState(null);
  const [nextMentorLesson, setNextMentorLesson] = useState(null);

  //  Student
  const [studentLessons, setStudentLessons] = useState([]);
  const [studentNextLesson, setStudentNextLesson] = useState(null);
  const [studentLastLesson, setStudentLastLesson] = useState(null);

  //  Admin
  const [allLessons, setAllLessons] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);

  // Search
  const [searchResults, setSearchResults] = useState([]);

  const wrap = async (action) => {
    setLoading(true);
    setError(null);
    try {
      await action();
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred");
      showToast({
        message: "Error",
        subMessage: err.message || "An error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const openModal = (lesson) => {
    setSelectedLesson(lesson);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedLesson(null);
    setModalVisible(false);
  };

  // ================= Mentor =================
  const fetchMentorLessons = async () =>
    wrap(async () => {
      const data = await LessonAPI.getLessonsByUser();
      setMentorLessons(data);
    });

  // const fetchUpcomingLessons = async () => wrap(async () => {
  //   const data = await LessonAPI.getUpcomingLessons();
  //   setUpcomingLessons(data);
  // });

  const fetchLessonCount = async () =>
    wrap(async () => {
      const data = await LessonAPI.getLessonCount();
      setLessonCount(data);
    });

  const fetchNextMentorLesson = async () =>
    wrap(async () => {
      const data = await LessonAPI.getNextLesson();
      setNextMentorLesson(data);
    });

  const updateLesson = async (id, newDescription, newLocation) =>
    wrap(async () => {
      await LessonAPI.updateLesson(id, newDescription, newLocation);
      await fetchMentorLessons(); // refresh lessons
      showToast({
        message: "Lesson updated successfully!",
        type: "success",
      });
    });

  const deleteLesson = async (id) =>
    wrap(async () => {
      await LessonAPI.deleteLesson(id);
      setMentorLessons((prev) => prev.filter((lesson) => lesson.id !== id));
      showToast({
        message: "Lesson deleted successfully!",
        type: "success",
      });
    });

  const createNewLesson = async (lessonData) =>
    wrap(async () => {
      const newLesson = await LessonAPI.createLesson(lessonData);
      setMentorLessons((prev) => [...prev, newLesson]);
    });

  const submitReview = async (lessonId, reviewData) =>
    wrap(async () => {
      await LessonAPI.submitMentorReview(lessonId, reviewData);
    });

  const fetchMentorReviwes = async () =>
    wrap(async () => {
      await LessonAPI.fetchUnresolvedMentorReview();
    });

  // ================= Student =================
  const fetchStudentLessons = async () =>
    wrap(async () => {
      const data = await LessonAPI.getStudentLessons();
      setStudentLessons(data);
    });

  // const fetchStudentNextLesson = async () => wrap(async () => {
  //   const data = await LessonAPI.getStudentNextLesson();
  //   setStudentNextLesson(data);
  // });

  const fetchStudentLastLesson = async () =>
    wrap(async () => {
      const data = await LessonAPI.getStudentLastLesson();
      setStudentLastLesson(data);
    });

  const registerLesson = async (lessonId) =>
    wrap(async () => {
      await LessonAPI.registerToLesson(lessonId);
    });

  const unregisterLesson = async (lessonId) =>
    wrap(async () => {
      await LessonAPI.unregisterFromLesson(lessonId);
    });

  const submitStudentReview = async (lessonId, reviewData) =>
    wrap(async () => {
      console.log(" Context: Submitting student review");
      await LessonAPI.submitStudentReview(lessonId, reviewData);
      await fetchStudentLessons();
      showToast({
        message: "Review submitted successfully!",
        type: "success",
      });
    });

  const fetchStudentReview = async () =>
    wrap(async () => {
      await LessonAPI.fetchUnresolvedStudentReview();
    });

  // ================= Admin =================
  const fetchAllLessons = async () =>
    wrap(async () => {
      const data = await LessonAPI.getAllLessons();
      setAllLessons(data);
    });

  const fetchPendingReviews = async () =>
    wrap(async () => {
      const data = await LessonAPI.getPendingReviews(); // from service
      setPendingReviews(data);
    });

  const approveLesson = async (lessonId) =>
    wrap(async () => {
      await LessonAPI.approveLesson(lessonId);
    });

  const rejectLesson = async (lessonId) =>
    wrap(async () => {
      await LessonAPI.rejectLesson(lessonId);
    });

  // ================= Search =================
  const searchLessons = async (filters) =>
    wrap(async () => {
      const data = await LessonAPI.searchLessons(filters);
      setSearchResults(data);
    });

  const value = {
    loading,
    error,
    openModal,
    closeModal,
    modalVisible,
    selectedLesson,
    // Mentor
    mentorLessons,
    upcomingLessons,
    lessonCount,
    nextMentorLesson,
    fetchMentorLessons,
    // fetchUpcomingLessons,
    fetchLessonCount,
    fetchNextMentorLesson,
    createNewLesson,
    updateLesson,
    deleteLesson,
    submitReview,
    fetchMentorReviwes,
    // Student
    studentLessons,
    studentNextLesson,
    studentLastLesson,
    fetchStudentLessons,
    // fetchStudentNextLesson,
    fetchStudentLastLesson,
    registerLesson,
    unregisterLesson,
    fetchStudentReview,
    // Admin
    allLessons,
    fetchAllLessons,
    approveLesson,
    rejectLesson,
    fetchPendingReviews,
    pendingReviews,
    // Search
    searchResults,
    searchLessons,
    //model
    modalVisible,
    setModalVisible,
    selectedLesson,
    setSelectedLesson,
    submitStudentReview,
  };

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  );
};
