import React from "react";
import { useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHome } from "@context/HomeContext";
import LessonCard from "../../components/LessonCard";
import { getGreeting } from "./utils/timeUtils";
import { useAuth } from "../../context/AuthContext";
import { mockNextLesson } from "../mocks/mockLessons";
import LessonDetailsModal from "../../components/LessonDetailsModal";
import { useFocusEffect } from "@react-navigation/native";

const MentorHome = () => {
  const { user, loading, isAuthenticated  } = useAuth();
  const { homeStats, fetchHomeStats  } = useHome();
  
  useFocusEffect(
    useCallback(() => {
      const tryFetchStats = async () => {
        if (!user || loading) return; // ❗ Wait for user and auth loading to complete
  
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          console.log("🏠 MentorHome → valid token, fetching home stats");
          fetchHomeStats();
        } else {
          console.log("🛑 MentorHome → no token found, skipping fetch");
        }
      };
  
      tryFetchStats();
    }, [user, loading]) // 🔁 rerun when auth state finishes loading
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
      {/* Greeting */}
      <Text className="text-2xl font-bold text-white">
        {getGreeting()}, {userName}
      </Text>

      {/* General description */}
      <Text className="text-lg text-gray-300 mt-2">
        Here you can manage your lessons and help your students succeed.
      </Text>

      {/* Completed hours */}
      <Text className="text-xl font-bold text-white mt-8">
        ✅ You completed {homeStats.lessonCount} out of 60 required personal hours
      </Text>

      {/* Average feedback */}
      {homeStats.feedbackStats && (
        <View className="mt-4 p-4 bg-gray-800 rounded-lg">
          <Text className="text-xl font-bold text-white">⭐ Overall rating from students:</Text>
          <Text className="text-gray-300 mt-2">
            Average score: {homeStats.feedbackStats.averageScore} out of 5
          </Text>
          <Text className="text-gray-300">
            Number of feedbacks: {homeStats.feedbackStats.totalFeedbacks}
          </Text>
        </View>
      )}

      {/* Next lesson */}
      <View className="mt-8">
        <Text className="text-xl font-bold text-white">🕒 Your next lesson:</Text>
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
