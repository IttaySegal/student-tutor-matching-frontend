import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import RTLText from "../../components/RTLText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLesson } from "../../context/LessonContext";
import LessonCard from "../../components/LessonCard";
import { getGreeting } from "./utils/timeUtils";
import { useAuth } from "../../context/AuthContext";

const MentorHome = () => {
  const { user } = useAuth();
  const { lessonStats, fetchLessonStats } = useLesson();
  //render agian to validate data
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

  const nextLesson = {
    subject: lessonStats.nextLesson.subject,
    grade: lessonStats.nextLesson.grade,
    date: lessonStats.nextLesson.date,
    day: lessonStats.nextLesson.day,
    startTime: lessonStats.nextLesson.time,
    endTime: lessonStats.nextLesson.endTime,
    mentor: lessonStats.nextLesson.student,
    description: "שיעור באנגלית – הכנה למבחן",
    students: ["נועה כהן", "יונתן אלון"],
    isMentor: true,
  };

  return (
    <View style={styles.container}>
      {/* כותרת שלום */}
      <RTLText style={styles.title}>
        {getGreeting()}, {userName}
      </RTLText>

      {/* תיאור כללי */}
      <RTLText style={styles.description}>
        כאן תוכל לנהל את השיעורים שלך ולעזור לחניכים להצליח.
      </RTLText>

      {/* שעות שהושלמו */}
      <RTLText style={styles.section}>
        ✅ ביצעת {lessonStats.lessonCount} מתוך 60 שעות מחויבות אישית
      </RTLText>

      {/* פידבק ממוצע */}
      {lessonStats.feedbackStats && (
        <View style={styles.feedbackBox}>
          <RTLText style={styles.section}>⭐ דירוג כולל מהחניכים:</RTLText>
          <RTLText style={styles.feedbackDetail}>
            ציון ממוצע: {lessonStats.feedbackStats.averageScore} מתוך 5
          </RTLText>
          <RTLText style={styles.feedbackDetail}>
            מספר פידבקים: {lessonStats.feedbackStats.totalFeedbacks}
          </RTLText>
        </View>
      )}

      {/* שיעור קרוב */}
      <View style={styles.lessonBox}>
        <RTLText style={styles.section}>🕒 השיעור הקרוב שלך:</RTLText>
        <LessonCard {...nextLesson} />
      </View>
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
  feedbackBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e8f4ff",
    borderRadius: 8,
  },
  feedbackDetail: {
    fontSize: 16,
    textAlign: "right",
    marginTop: 5,
  },
  lessonBox: {
    marginTop: 30,
  },
});

export default MentorHome;
