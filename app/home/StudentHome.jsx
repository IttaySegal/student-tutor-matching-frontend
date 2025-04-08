import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLesson } from "../../context/LessonContext";
import LessonCard from "../../components/LessonCard";
import RTLText from "../../components/RTLText";
import { getGreeting } from "../../utils/HometimeUtils"; 
import { buildLessonObject } from "../../utils/HomelessonUtils";


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


  const isLoading = !lessonStats;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <RTLText style={{ marginTop: 10 }}>טוען מידע...</RTLText>
      </View>
    );
  }

  const userName = lessonStats?.userName || "חניך";

  const lastLesson = buildLessonObject(lessonStats.lastLesson, "שיעור קודם");
  const upcomingLesson = buildLessonObject(lessonStats.upcomingLesson,"שיעור קרוב");

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

      <TouchableOpacity onPress={() => router.push("/lessons/MyLessonsScreen")} style={{ marginTop: 20 }}>
        <RTLText style={{ fontSize: 16, color: '#1E90FF', textAlign: "center" }}>
          מעבר לרשימת השיעורים שלי
        </RTLText>
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
});

export default StudentHome;
