import React from "react";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHome } from "@context/HomeContext";
import LessonCard from "../../components/LessonCard";
import { getGreeting } from "./utils/timeUtils";
import { useAuth } from "../../context/AuthContext";
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
      {/* Greeting Section */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-white">
          {getGreeting()}, {userName}
        </Text>
        <Text className="text-lg text-gray-300 mt-2">
          Welcome to your learning journey
        </Text>
      </View>

      {/* Next Lesson Section */}
      <View className="mt-6">
        <Text className="text-2xl font-bold text-white mb-4">
          📚 Your Next Lesson
        </Text>
        {homeStats.nextLesson ? (
          <LessonCard
            {...homeStats.nextLesson}
            ModalComponent={LessonDetailsModal}
            modalProps={{ isMyLessons: true }}
          />
        ) : (
          <View className="bg-white rounded-2xl p-6">
            <Text className="text-center text-gray-600">
              No upcoming lessons scheduled
            </Text>
          </View>
        )}
      </View>

      {/* Motivation Section */}
      <View className="bg-white rounded-2xl p-6 mt-6 shadow-lg">
        <Text className="text-xl font-bold text-center mb-2">
          ✨ Daily Inspiration
        </Text>
        <Text className="text-center text-lg text-gray-700 italic">
          {homeStats.motivationSentence}
        </Text>
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

export default StudentHome;
