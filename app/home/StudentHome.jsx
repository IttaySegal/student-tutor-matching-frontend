import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLesson } from "../../context/LessonContext";
import LessonCard from "../../components/LessonCard";
import RTLText from "../../components/RTLText";
import { getGreeting } from "./utils/timeUtils";
import { useAuth } from "../../context/AuthContext";
import { mockPrevLesson, mockNextLesson } from "../mocks/mockLessons"; // ייבוא הנתונים

const StudentHome = () => {
  const { user } = useAuth();
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

  const userName = `${user.first_name} ${user.last_name}`; // יצירת השם המלא

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
      <LessonCard {...mockPrevLesson} />

      {/* שיעור קרוב */}
      <RTLText style={styles.section}>🕒 השיעור הקרוב שלך:</RTLText>
      <LessonCard {...mockNextLesson} />
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
