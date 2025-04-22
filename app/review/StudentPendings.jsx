import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useLesson } from "@context/LessonContext";
import LessonCard from "@components/LessonCard";
import LessonReviewStudent from "@components/LessonReviewStudent";


export default function StudentPendings() {
    const { fetchStudentReview, studentLessons, submitStudentReview } = useLesson(); // Add fetchMentorReviwes
  
    // const { studentLessons, fetchStudentLessons, submitStudentReview } = useLesson();
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pendingLessons, setPendingLessons] = useState([]); // Add state for pending lessons
    
  
    const handleRefresh = async () => {
      setIsRefreshing(true);
      try {
        const reviews = await fetchStudentReview(); // Use fetchMentorReviwes instead
        setPendingLessons(reviews); // Set the pending lessons from the response;
      } catch (error) {
        console.error('Error refreshing lessons:', error);
      }
      setIsRefreshing(false);
    };
  
    useEffect(() => {
      handleRefresh();
    }, []);
  
    // const pendingLessons = studentLessons.filter(
    //   (lesson) => lesson.status === "completed" && !lesson.studentReview
    // );
  
    const handleLessonPress = (lesson) => {
      setSelectedLesson(lesson);
      setModalVisible(true);
    };
  
    const handleCloseModal = async () => {
      setModalVisible(false);
      setSelectedLesson(null);
      await handleRefresh();
    };
  
    const handleSubmitReview = async (reviewData) => {
      console.log("📝 StudentPendings: Submitting review for lesson:", selectedLesson?.id);
      if (selectedLesson) {
        await submitStudentReview(selectedLesson.id, reviewData);
        handleCloseModal();
      }
    };
  
    return (
      <View className="flex-1 bg-primary px-5 py-6">
        <Text className="text-2xl font-bold text-white mb-6 text-center">
          Pending Reviews
        </Text>
        <FlatList
          data={pendingLessons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LessonCard {...item} onPress={() => handleLessonPress(item)} />
          )}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={
            <Text className="text-white text-center mt-10">
              No pending reviews.
            </Text>
          }
        />
        {selectedLesson && (
          <LessonReviewStudent
            visible={modalVisible}
            onClose={handleCloseModal}
            onSubmit={handleSubmitReview}
            {...selectedLesson}
          />
        )}
      </View>
    );
  }