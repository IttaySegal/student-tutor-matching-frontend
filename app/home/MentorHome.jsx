import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import RTLText from "@components/LessonCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLesson } from "@context/LessonContext";
import LessonCard from "@components/LessonCard";
import { getGreeting } from "@utils/HometimeUtils"; 
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { buildLessonObject } from "@utils/HomelessonUtils";

const MentorHome = () => {
  const { lessonStats, fetchLessonStats } = useLesson();
  //render agian to validate data
  useEffect(() => {
    const loadData = async () => {
      console.log("📡 useEffect in MentorHome");
      if (!lessonStats) {
        const token = await AsyncStorage.getItem("accessToken");
        console.log("🔑 Token in MentorHome:", token);
        if (token) await fetchLessonStats(token);
      } else {
        console.log("✅ lessonStats already exists");
      }
    };

    loadData();
  }, []);

  const isLoading = !lessonStats;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <RTLText style={{ marginTop: 10 }}>טוען מידע...</RTLText>
      </View>
    );
  }

  const userName = lessonStats?.userName || "מנטור";

  const nextLesson = buildLessonObject(lessonStats.nextLesson, "שיעור באנגלית – הכנה למבחן", true);

  
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

    
      <TouchableOpacity onPress={() => router.push("/lessons/MyLessonsScreen")}>
        <RTLText style={styles.linkButton}>📚 עבור לשיעורים שלי</RTLText>
      </TouchableOpacity>
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
  linkButton: {
    fontSize: 16,
    color: "#007BFF",
    marginTop: 20,
    textAlign: "right",
    textDecorationLine: "underline",
  },
});

export default MentorHome;