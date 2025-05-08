import axios from "@services/axiosInstance";
import { EXPO_PUBLIC_SERVER_URL } from "@env";

const BASE_URL = `${EXPO_PUBLIC_SERVER_URL}/lessons`;

const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Helper function to convert ISO to our frontend format
const convertFromISO = (isoDate) => {
  const date = new Date(isoDate);
  return {
    date: date.toLocaleDateString("en-GB"), // YYYY-MM-DD format
    day: date.toLocaleDateString("en-US", { weekday: "long" }),
    startTime: date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    endTime: new Date(date.getTime() + 60 * 60 * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

// Helper function to convert our frontend format to ISO
const convertToISO = (date, time) => {
  return new Date(`${date}T${time}`).toISOString();
};

// Frontend to Backend transformation
const transformToBackendFormat = (lessonData) => {
  return {
    lessonId: lessonData.id,
    subjectName: lessonData.subject,
    grade: lessonData.grade,
    level: lessonData.group, // Map group to level
    description: lessonData.description,
    appointedDateTime: convertToISO(lessonData.date, lessonData.time),
    format: lessonData.type.toLowerCase(), // Convert to lowercase
    locationOrLink: lessonData.location,
  };
};

// // Backend to Frontend transformation
// export const transformToFrontendFormat = (lessonData) => {
//   return {
//     id: lessonData.lessonId,
//     subject: lessonData.subjectName,
//     grade: lessonData.grade,
//     level: lessonData.level,
//     description: lessonData.description,
//     format: lessonData.format,
//     lessonLocation: lessonData.locationOrLink,
//     mentor: lessonData.tutorFullName,
//     students: lessonData.enrolledTutees || [],
//     ...convertFromISO(lessonData.appointedDateTime),
//   };
// };

export const transformToFrontendFormat = (lessonData) => {
  const students = lessonData.enrolledTutees || [];

  const studentAttendance = {};
  const studentNames = {};

  students.forEach((tutee) => {
    studentAttendance[tutee.tuteeUserId] = tutee.presence ? "Present" : "Absent";
    studentNames[tutee.tuteeUserId] = tutee.tuteeFullName;
  });

  return {
    id: lessonData.lessonId,
    subject: lessonData.subjectName,
    grade: lessonData.grade,
    level: lessonData.level,
    description: lessonData.description,
    format: lessonData.format,
    lessonLocation: lessonData.locationOrLink,
    mentor: lessonData.tutorFullName,
    students,
    studentAttendance,
    studentNames,
    selectedDescriptions: [lessonData.description], // fallback
    rating: 5, // placeholder if no rating provided
    ...convertFromISO(lessonData.appointedDateTime),
  };
};


/* =========================
   Search & Discovery
========================= */
//TODO
export const searchLessons = async (filters) => {
  try {
    const res = await axios.post(`${BASE_URL}/available`, filters);
    const lessons = res.data.data.lessons;
    console.log("=========return data from back=====================");
    console.log(lessons);
    return lessons.map(transformToFrontendFormat);
    // return res.data;
  } catch (err) {
    console.error("Error searching lessons:", err);
    throw new Error("Failed to search lessons.");
  }
};

/* =========================
   Mentor Actions
========================= */

export const getLessonsByUser = async () => {
  ////DONE
  try {
    // const res = await axios.get(`${BASE_URL}/mentor/my-lessons`);
    // return res.data.map((lesson) => transformToFrontendFormat(lesson));
    // // return res.data;
    const res = await axios.get(`${BASE_URL}/tutor-upcoming-lessons`);
    return res.data.data.lessonsWithEnrolledTutees.map(
      transformToFrontendFormat
    );
  } catch (err) {
    console.error("Error fetching mentor lessons:", err);
    throw new Error("Failed to fetch mentor lessons.");
  }
};
//DONE
export const createLesson = async (lessonData) => {
  try {
    console.log("==============================");
    console.log(lessonData);
    console.log("==============================");

    const payload = transformToBackendFormat(lessonData);
    console.log(payload);
    const res = await axios.post(`${BASE_URL}/create`, payload);
    // const res = await axios.post(`${BASE_URL}/create`, lessonData);
    const lesson = res.data.data.lesson;
    console.log("=========return data from back=====================");

    console.log(lesson);
    return transformToFrontendFormat(lesson);
    // return res.data;
  } catch (err) {
    console.error("Error creating lesson:", err);
    throw new Error("Failed to create lesson.");
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////
//TODO -- verify the full lesson object is pass - check is students pass in the lesson object
export const updateLesson = async (lessonId, description, locationOrLink) => {
  try {
    console.log("🛠 INSIDE updateLesson");
    console.log("description:", description);
    console.log("locationOrLink:", locationOrLink);
    await axios.patch(`${BASE_URL}/edit`, {
      lessonId,
      description,
      locationOrLink,
    });
  } catch (err) {
    console.error("Error updating lesson:", err);
    throw new Error("Failed to update lesson.");
  }
};
//DONE
export const deleteLesson = async (lessonId) => {
  try {
    // const res = await axios.patch(`${BASE_URL}/cancel`, { lessonId });
    // return transformToFrontendFormat(res.data.data.lesson);
    await axios.patch(`${BASE_URL}/cancel`, { lessonId });

    // await axios.delete(`${BASE_URL}/delete/${id}`);
  } catch (err) {
    console.error("Error deleting lesson:", err);
    throw new Error("Failed to delete lesson.");
  }
};
// //DONE
// export const getUpcomingLessons = async () => {
//   try {
//     // const res = await axios.get(`${BASE_URL}/mentor/upcoming`);
//     // return res.data.map((lesson) => transformToFrontendFormat(lesson));
//     const res = await axios.get(`${BASE_URL}/tutor-upcoming-lessons`);
//     return res.data.data.lessonsWithEnrolledTutees.map(transformToFrontendFormat);

//     // return res.data;
//   } catch (err) {
//     console.error("Error fetching upcoming lessons:", err);
//     throw new Error("Failed to fetch upcoming lessons.");
//   }
// };
//DONE
export const getLessonCount = async () => {
  try {
    // const res = await axios.get(`${BASE_URL}/mentor/lesson-count`);
    // return res.data;
    const res = await axios.get(`${BASE_URL}/approved-lessons-amount`);
    return res.data.data.amountOfApprovedLessons;
  } catch (err) {
    console.error("Error fetching lesson count:", err);
    throw new Error("Failed to fetch lesson count.");
  }
};

// export const getNextLesson = async () => {// DELETE THIS API!!!
//   try {
//     const res = await axios.get(`${BASE_URL}/mentor/next`);
//     // return res.data;
//     return transformToFrontendFormat(res.data);
//   } catch (err) {
//     console.error("Error fetching next lesson:", err);
//     throw new Error("Failed to fetch next lesson.");
//   }
// };

//TODO
// export const submitMentorReview = async (lessonId, reviewData) => {
//   try {
//     const res = await axios.patch(`${BASE_URL}/upload-lesson-report`, {
//       lessonId,
//       lessonSummary: reviewData.summary,
//       tuteesPresence: reviewData.presence,
//     });
//     return transformToFrontendFormat(res.data.updatedLesson);
//   } catch (err) {
//     console.error("Error submitting mentor review:", err);
//     throw new Error("Failed to submit mentor review.");
//   }
// };
export const submitMentorReview = async (lessonId, reviewData) => {
  try {
    const res = await axios.patch(`${BASE_URL}/upload-lesson-report`, {
      lessonId,
      lessonSummary: reviewData.lessonSummary,
      tuteesPresence: reviewData.tuteesPresence,
    });
    return res.data;
  } catch (err) {
    console.error("Error submitting mentor review:", err);
    throw new Error("Failed to submit mentor review.");
  }
};

export const fetchUnresolvedMentorReview = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/tutor-summary-pending-lessons`);
    return res.data.data.lessonsWithEnrolledTutees.map(
      transformToFrontendFormat
    );
    // const res = await axios.get(`${BASE_URL}/mentor/review`);
    // return res.data;
  } catch (err) {
    console.error("Error getting mentor review:", err);
    throw new Error("Failed to get mentor review.");
  }
};

/* =========================
  Student Actions
========================= */

export const getStudentLessons = async () => {
  //DONE
  try {
    //   const res = await axios.get(`${BASE_URL}/student/my-lessons`);
    //   // return res.data;
    //   return res.data.data.map((lesson) => transformToFrontendFormat(lesson));
    const res = await axios.get(`${BASE_URL}/tutee-upcoming-lessons`);
    return res.data.data.lessonsWithEnrolledTutees.map(
      transformToFrontendFormat
    );
  } catch (err) {
    console.error("Error fetching student lessons:", err);
    throw new Error("Failed to fetch student lessons.");
  }
};

// export const getStudentNextLesson = async () => { //DELELTE!!!
//   try {
//     const res = await axios.get(`${BASE_URL}/student/next`, authHeaders(token));
//     // return res.data;
//     return transformToFrontendFormat(res.data);
//   } catch (err) {
//     console.error("Error fetching next student lesson:", err);
//     throw new Error("Failed to fetch next student lesson.");
//   }
// };

export const getStudentLastLesson = async () => {
  ///HANDLE OUR OUR OWN - STUPID SOLUTION!!
  try {
    const res = await axios.get(`${BASE_URL}/student/last`);
    // return res.data;
    return transformToFrontendFormat(res.data);
  } catch (err) {
    console.error("Error fetching last student lesson:", err);
    throw new Error("Failed to fetch last student lesson.");
  }
};

export const registerToLesson = async (lessonId) => {
  try {
    // const res = await axios.post(
    //   `${BASE_URL}/student/register/${lessonId}`,
    //   {}
    // );
    // return res.data;
    console.log("📝 Attempting to register for lesson:", lessonId);
    const res = await axios.post(`${BASE_URL}/enroll`, { lessonId });
    console.log("✅ Registration response:", res.data.data.enrollment);
    return transformToFrontendFormat(res.data.data.enrollment);
  } catch (err) {
    console.error("Error registering to lesson:", err);
    throw new Error("Failed to register to lesson.");
  }
};

export const unregisterFromLesson = async (lessonId) => {
  try {
    // const res = await axios.post(
    //   `${BASE_URL}/student/unregister/${lessonId}`,
    //   {}
    // );
    // return res.data;
    const res = await axios.delete(`${BASE_URL}/withdraw`, {
      data: { lessonId },
    });
    return transformToFrontendFormat(res.data.data.lesson);
  } catch (err) {
    console.error("Error unregistering from lesson:", err);
    throw new Error("Failed to unregister from lesson.");
  }
};

export const submitStudentReview = async (reviewData) => {
  try {
    console.log("📤 LessonAPI: Submitting student review:", reviewData);

    const res = await axios.patch(`${BASE_URL}/review`, {
      lessonId: reviewData.lessonId,
      clarity: reviewData.clarity,
      understanding: reviewData.understanding,
      focus: reviewData.focus,
      helpful: reviewData.helpful,
    });

    return res.data;
  } catch (err) {
    if (err.response) {
      console.error("❗ Server responded with error:", err.response.data);
    } else if (err.request) {
      console.error("❗ No response received:", err.request);
    } else {
      console.error("❗ Error setting up the request:", err.message);
    }
    throw new Error("Failed to submit student review.");
  }
};

export const fetchUnresolvedStudentReview = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/tutee-review-pending-lessons`);
    return res.data.data.lessonsWithEnrolledTutees.map(
      transformToFrontendFormat
    );
  } catch (err) {
    console.error("Error getting student review:", err);
    throw new Error("Failed to get student review.");
  }
};

/* =========================
   Admin Actions
========================= */

export const getAllLessons = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/all`);
    // return res.data;
    return res.data.map((lesson) => transformToFrontendFormat(lesson));
  } catch (err) {
    console.error("Error fetching all lessons:", err);
    throw new Error("Failed to fetch all lessons.");
  }
};

/////-------------------- TODO ----------------------------------------//
// Lessons/patch_lessons_update_lesson_verdict
export const approveLesson = async (lessonId, isApproved) => {
  try {
    const res = await axios.patch(`${BASE_URL}/update-lesson-verdict`, {
      lessonId,
      isApproved
    });
    return res.data;
  } catch (err) {
    console.error("Error approving lesson:", err);
    throw new Error("Failed to approve lesson.");
  }
};

export const rejectLesson = async (lessonId, isApproved) => {
  try {
    const res = await axios.patch(`${BASE_URL}/update-lesson-verdict`, {
      lessonId,
      isApproved
    });
    return res.data;
  } catch (err) {
    console.error("Error rejecting lesson:", err);
    throw new Error("Failed to reject lesson.");
  }
};
/////----------------------------------------------------------------------//

/////-------------------- TODO ----------------------------------------//
// Lessons/get_lessons_verdict_pending_lessons
export const getPendingReviews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/verdict-pending-lessons`);
    console.log("📦 Raw pending review response:", res.data.data.verdictPendingLessons.map((lesson) => transformToFrontendFormat(lesson)));
    return res.data.data.verdictPendingLessons.map((lesson) => transformToFrontendFormat(lesson));
  } catch (err) {
    console.error("Error fetching pending reviews:", err);
    throw new Error("Failed to fetch pending reviews.");
  }
};
