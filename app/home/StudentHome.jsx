import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLesson } from "../../context/LessonContext";
import LessonCard from "../../components/LessonCard";
import { getGreeting } from "./utils/timeUtils";
import { useAuth } from "../../context/AuthContext";
import { mockPrevLesson, mockNextLesson } from "../mocks/mockLessons";
import LessonDetailsModal from "../../components/LessonDetailsModal";

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
        <Text style={{ marginTop: 10 }}>Loading information...</Text>
      </View>
    );
  }

  const userName = `${user.first_name} ${user.last_name}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {getGreeting()}, {userName}
      </Text>

      <Text style={styles.description}>
        Here's an overview of your recent and upcoming lessons.
      </Text>

      {/* Last Lesson */}
      <Text style={styles.section}>🕘 Your Last Lesson:</Text>
      <LessonCard {...mockPrevLesson} ModalComponent={LessonDetailsModal} />

      {/* Next Lesson */}
      <Text style={styles.section}>🕒 Your Next Lesson:</Text>
      <LessonCard {...mockNextLesson} ModalComponent={LessonDetailsModal} />
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
    textAlign: "left",
  },
  description: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "left",
  },
  section: {
    fontSize: 18,
    marginTop: 30,
    textAlign: "left",
    fontWeight: "bold",
  },
});

export default StudentHome;
