import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useLesson } from "@context/LessonContext";
import LessonCard from "../../components/LessonCard";
import LessonDetailsModal from "../../components/LessonDetailsModal";
import { useFocusEffect } from "@react-navigation/native";

export default function MyLessonSscreen() {
  const { user } = useAuth();
  const {
    mentorLessons,
    studentLessons,
    fetchMentorLessons,
    fetchStudentLessons,
  } = useLesson();
  const [selectedLesson, setSelectedLesson] = React.useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] =
    React.useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLessons = async () => {
    if (user?.role === "mentor") {
      console.log("📡 Fetching mentor lessons...");
      await fetchMentorLessons();
      console.log("🎓 mentorLessons:", mentorLessons);
    } else if (user?.role === "student") {
      console.log("📡 Fetching student lessons...");
      await fetchStudentLessons();
      console.log("🎓 studentLessons:", studentLessons);
    }
  };

  // useEffect(() => {
  //   fetchLessons();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      fetchLessons();
    }, [user])
  );

  // 🆕 Pull-to-Refresh handler
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchLessons();
    setRefreshing(false);
  }, [user]);

  const handleLessonPress = (lesson) => {
    setSelectedLesson(lesson);
    setIsDetailsModalVisible(true);
  };

  const handleUnregisterSuccess = (lessonId) => {
    // Remove the unregistered lesson from the list
    if (user?.role === "student") {
      fetchLessons(); // Refresh the list
    }
  };

  const renderLessonItem = ({ item }) => (
    <LessonCard {...item} onPress={() => handleLessonPress(item)} />
  );

  const lessonList = user?.role === "mentor" ? mentorLessons : studentLessons;

  return (
    <View className="flex-1 bg-primary px-5 py-6">
      <Text className="text-2xl font-bold text-white mb-6 text-center">
        My Lessons
      </Text>
      <FlatList
        data={lessonList}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text className="text-white text-center mt-10">
            No lessons found.
          </Text>
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      {selectedLesson && (
        <LessonDetailsModal
          visible={isDetailsModalVisible}
          onClose={() => {
            setIsDetailsModalVisible(false);
            setSelectedLesson(null);
          }}
          isMyLessons={true}
          onUnregisterSuccess={handleUnregisterSuccess}
          {...selectedLesson}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
