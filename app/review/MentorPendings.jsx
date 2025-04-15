import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useLesson } from "@context/LessonContext";
import LessonCard from "@components/LessonCard";
import LessonReviewMentor from "@components/LessonReviewMentor";

// In MentorPendings.jsx
export default function MentorPendings() {
    const { mentorLessons, fetchMentorLessons } = useLesson();
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
  
    const handleRefresh = async () => {
      setIsRefreshing(true);
      try {
        await fetchMentorLessons();
      } catch (error) {
        console.error('Error refreshing lessons:', error);
      }
      setIsRefreshing(false);
    };
  
    useEffect(() => {
      handleRefresh();
    }, []);
  
    const pendingLessons = mentorLessons.filter(
      (lesson) => lesson.status === "completed" && !lesson.mentorReview
    );
  
    const handleLessonPress = (lesson) => {
      setSelectedLesson(lesson);
      setModalVisible(true);
    };
  
    const handleCloseModal = async () => {
      setModalVisible(false);
      setSelectedLesson(null);
      await handleRefresh();
    };
  
    return (
      <View className="flex-1 bg-primary px-5 py-6">
        <Text className="text-2xl font-bold text-white mb-6 text-center">
          Pending Reviews
        </Text>
  
        <FlatList
          data={pendingLessons}
          renderItem={({ item }) => (
            <LessonCard {...item} onPress={() => handleLessonPress(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={
            <Text className="text-white text-center mt-10">No pending reviews.</Text>
          }
        />
  
        {selectedLesson && (
          <LessonReviewMentor
            visible={modalVisible}
            onClose={handleCloseModal}
            {...selectedLesson}
          />
        )}
      </View>
    );
  }