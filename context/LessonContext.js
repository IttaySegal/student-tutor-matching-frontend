import React, { createContext, useContext, useState } from "react";
import * as LessonAPI from "@services/lessonService";

const LessonContext = createContext();

export const useLesson = () => useContext(LessonContext);

export const LessonProvider = ({ children }) => {
  // Common State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    } finally {
      setLoading(false);
    }
  };

  // ================= Mentor =================
  const fetchMentorLessons = async () => wrap(async () => {
    const data = await LessonAPI.getLessonsByUser();
    setMentorLessons(data);
  });

  const fetchUpcomingLessons = async () => wrap(async () => {
    const data = await LessonAPI.getUpcomingLessons();
    setUpcomingLessons(data);
  });

  const fetchLessonCount = async () => wrap(async () => {
    const data = await LessonAPI.getLessonCount();
    setLessonCount(data);
  });

  const fetchNextMentorLesson = async () => wrap(async () => {
    const data = await LessonAPI.getNextLesson();
    setNextMentorLesson(data);
  });

  const createNewLesson = async (lessonData) => wrap(async () => {
    const newLesson = await LessonAPI.createLesson(lessonData);
    setMentorLessons(prev => [...prev, newLesson]);
  });

  // ================= Student =================
  const fetchStudentLessons = async () => wrap(async () => {
    const data = await LessonAPI.getStudentLessons();
    setStudentLessons(data);
  });

  const fetchStudentNextLesson = async () => wrap(async () => {
    const data = await LessonAPI.getStudentNextLesson();
    setStudentNextLesson(data);
  });

  const fetchStudentLastLesson = async () => wrap(async () => {
    const data = await LessonAPI.getStudentLastLesson();
    setStudentLastLesson(data);
  });

  const registerLesson = async (lessonId) => wrap(async () => {
    await LessonAPI.registerToLesson(lessonId);
  });

  const unregisterLesson = async (lessonId) => wrap(async () => {
    await LessonAPI.unregisterFromLesson(lessonId);
  });

  // ================= Admin =================
  const fetchAllLessons = async () => wrap(async () => {
    const data = await LessonAPI.getAllLessons();
    setAllLessons(data);
  });

  const approveLesson = async (lessonId) => wrap(async () => {
    await LessonAPI.approveLesson(lessonId);
  });

  const rejectLesson = async (lessonId) => wrap(async () => {
    await LessonAPI.rejectLesson(lessonId);
  });

  // ================= Search =================
  const searchLessons = async (filters) => wrap(async () => {
    const data = await LessonAPI.searchLessons(filters);
    setSearchResults(data);
  });

  const value = {
    loading,
    error,
    // Mentor
    mentorLessons,
    upcomingLessons,
    lessonCount,
    nextMentorLesson,
    fetchMentorLessons,
    fetchUpcomingLessons,
    fetchLessonCount,
    fetchNextMentorLesson,
    createNewLesson,
    // Student
    studentLessons,
    studentNextLesson,
    studentLastLesson,
    fetchStudentLessons,
    fetchStudentNextLesson,
    fetchStudentLastLesson,
    registerLesson,
    unregisterLesson,
    // Admin
    allLessons,
    fetchAllLessons,
    approveLesson,
    rejectLesson,
    // Search
    searchResults,
    searchLessons,
  };

  return (
    <LessonContext.Provider value={value}>
      {children}
    </LessonContext.Provider>
  );
};

