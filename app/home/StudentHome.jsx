import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLesson } from "../../context/LessonContext";
import LessonCard from "../../components/LessonCard";
import RTLText from "../../components/RTLText";
import { getGreeting } from "./utils/timeUtils"; 

const StudentHome = () => {
  const { lessonStats, fetchLessonStats } = useLesson();

  useEffect(() => {
    const loadData = async () => {
      if (!lessonStats) {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) await fetchLessonStats(token);
      }
    };
    loadData();
  }, []);

  if (!lessonStats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <RTLText style={{ marginTop: 10 }}>טוען מידע...</RTLText>
      </View>
    );
  }

  const userName = lessonStats?.userName || "חניך";

  const lastLesson = {
    subject: lessonStats.lastLesson.subject,
    grade: lessonStats.lastLesson.grade || "לא ידוע",
    date: lessonStats.lastLesson.date,
    day: lessonStats.lastLesson.day || "לא ידוע",
    startTime: lessonStats.lastLesson.time || "לא ידוע",
    endTime: lessonStats.lastLesson.endTime || "לא ידוע",
    mentor: lessonStats.lastLesson.mentor,
    description: "שיעור קודם",
    students: [],
    isMentor: false,
  };

  const upcomingLesson = {
    subject: lessonStats.upcomingLesson.subject,
    grade: lessonStats.upcomingLesson.grade || "לא ידוע",
    date: lessonStats.upcomingLesson.date,
    day: lessonStats.upcomingLesson.day || "לא ידוע",
    startTime: lessonStats.upcomingLesson.time || "לא ידוע",
    endTime: lessonStats.upcomingLesson.endTime || "לא ידוע",
    mentor: lessonStats.upcomingLesson.mentor,
    description: "שיעור קרוב",
    students: [],
    isMentor: false,
  };

  return (
    <View style={styles.container}>
      <RTLText style={styles.title}>
        {getGreeting()}, {userName}
      </RTLText>

      <RTLText style={styles.description}>
        הנה סקירה של השיעורים האחרונים והקרובים שלך.
      </RTLText>

      {/* שיעור אחרון */}
      <RTLText style={styles.section}>🕘 השיעור האחרון שלך:</RTLText>
      <LessonCard {...lastLesson} />

      {/* שיעור קרוב */}
      <RTLText style={styles.section}>🕒 השיעור הקרוב שלך:</RTLText>
      <LessonCard {...upcomingLesson} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
  },
  description: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "right",
  },
  section: {
    fontSize: 18,
    marginTop: 30,
    textAlign: "right",
    fontWeight: "bold",
  },
});

export default StudentHome;
