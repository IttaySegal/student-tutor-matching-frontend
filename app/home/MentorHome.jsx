import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import RTLText from "../../components/RTLText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLesson } from "../../context/LessonContext";
import LessonCard from "../../components/LessonCard";
import { getGreeting } from "./utils/timeUtils";
import { useAuth } from "../../context/AuthContext";
import { mockNextLesson } from "../mocks/mockLessons"; // ייבוא הנתונים
import LessonDetailsModal from "../../components/LessonDetailsModal";

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

  return (
    <View className="flex-1 bg-primary px-5 pt-10">
      {/* כותרת שלום */}
      <RTLText className="text-2xl font-bold text-white">
        {getGreeting()}, {userName}
      </RTLText>

      {/* תיאור כללי */}
      <RTLText className="text-lg text-gray-300 mt-2">
        כאן תוכל לנהל את השיעורים שלך ולעזור לחניכים להצליח.
      </RTLText>

      {/* שעות שהושלמו */}
      <RTLText className="text-xl font-bold text-white mt-8">
        ✅ ביצעת {lessonStats.lessonCount} מתוך 60 שעות מחויבות אישית
      </RTLText>

      {/* פידבק ממוצע */}
      {lessonStats.feedbackStats && (
        <View className="mt-4 p-4 bg-gray-800 rounded-lg">
          <RTLText className="text-xl font-bold text-white">⭐ דירוג כולל מהחניכים:</RTLText>
          <RTLText className="text-gray-300 mt-2">
            ציון ממוצע: {lessonStats.feedbackStats.averageScore} מתוך 5
          </RTLText>
          <RTLText className="text-gray-300">
            מספר פידבקים: {lessonStats.feedbackStats.totalFeedbacks}
          </RTLText>
        </View>
      )}

      {/* שיעור קרוב */}
      <View className="mt-8">
        <RTLText className="text-xl font-bold text-white">🕒 השיעור הקרוב שלך:</RTLText>
        <LessonCard 
          {...mockNextLesson} 
          ModalComponent={LessonDetailsModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
  },
});

export default MentorHome;
