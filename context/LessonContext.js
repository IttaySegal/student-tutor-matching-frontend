import { createContext, useContext, useState } from "react";
import { getAggregateHomeData } from "../services/homeService";

const LessonContext = createContext();
export const useLesson = () => useContext(LessonContext);

export const LessonProvider = ({ children }) => {
  const [lessonStats, setLessonStats] = useState(null);

  const fetchLessonStats = async (accessToken) => {
    console.log("📥 START fetchLessonStats");

    try {
      const data = await getAggregateHomeData(accessToken);
      console.log(data)
      setLessonStats(data);
    } catch (error) {
      console.error("Failed to fetch lesson stats", error);
    }
  };

  return (
    <LessonContext.Provider value={{ lessonStats, fetchLessonStats }}>
      {children}
    </LessonContext.Provider>
  );
};
