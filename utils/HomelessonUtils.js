export const buildLessonObject = (data, description, isMentor = false) => ({
    subject: data?.subject || "לא ידוע",
    grade: data?.grade || "לא ידוע",
    date: data?.date || "לא ידוע",
    day: data?.day || "לא ידוע",
    startTime: data?.time || "לא ידוע",
    endTime: data?.endTime || "לא ידוע",
    mentor: data?.mentor || "לא ידוע",
    description,
    students: [],
    isMentor,
  });
  