import React, { useFocusEffect } from "react";
import { useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHome } from "@context/HomeContext";
import LessonCard from "../../components/LessonCard";
import { getGreeting } from "./utils/timeUtils";
import { useAuth } from "../../context/AuthContext";
import { mockPrevLesson, mockNextLesson } from "../mocks/mockLessons";
import LessonDetailsModal from "../../components/LessonDetailsModal";

const StudentHome = () => {
  const { user, loading } = useAuth();
  const { homeStats, fetchHomeStats } = useHome();

  useFocusEffect(
    useCallback(() => {
      const tryFetchStats = async () => {
        if (!user || loading) return;

        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          console.log("🎓 StudentHome → valid token, fetching home stats");
          fetchHomeStats();
        } else {
          console.log("🛑 StudentHome → no token found, skipping fetch");
        }
      };

      tryFetchStats();
    }, [user, loading])
  );

  if (!homeStats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>Loading information...</Text>
      </View>
    );
  }

  const userName = `${user.first_name} ${user.last_name}`;

  return (
    <View className="flex-1 bg-primary px-5 pt-10">
      <Text className="text-2xl font-bold text-white">
        {getGreeting()}, {userName}
      </Text>

      <Text className="text-lg text-gray-300 mt-2">
        Here's an overview of your recent and upcoming lessons.
      </Text>

      {/* Last Lesson */}
      <Text className="text-xl font-bold text-white mt-8">🕘 Your Last Lesson:</Text>
      <LessonCard {...mockPrevLesson} ModalComponent={LessonDetailsModal} />

      {/* Next Lesson */}
      <Text className="text-xl font-bold text-white mt-8">🕒 Your Next Lesson:</Text>
      <LessonCard {...mockNextLesson} ModalComponent={LessonDetailsModal} />
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

export default StudentHome;
