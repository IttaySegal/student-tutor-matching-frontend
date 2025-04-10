import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";
import LessonReviewMentor from "../../components/LessonReviewMentor";
import LessonReviewStudent from "../../components/LessonReviewStudent";
import LessonCard from "../../components/LessonCard";

export default function BookmarkScreen() {
  const { user } = useAuth();
  const [selectedLesson, setSelectedLesson] = React.useState(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = React.useState(false);

  // Mock data for testing - replace with actual data from your backend
  const mockLessons = [
    {
      id: 1,
      subject: "Mathematics",
      grade: "8",
      date: "2024-03-15",
      day: "Tuesday",
      startTime: "14:00",
      endTime: "15:00",
      mentor: "Israel Israeli",
      description: "Math lesson",
      students: [
        { _id: "1", first_name: "Danny", last_name: "Cohen" },
        { _id: "2", first_name: "Sarah", last_name: "Levy" },
      ],
    },
    {
      id: 2,
      subject: "English",
      grade: "9",
      date: "2024-03-16",
      day: "Wednesday",
      startTime: "15:30",
      endTime: "16:30",
      mentor: "Sarah Cohen",
      description: "English lesson",
      students: [
        { _id: "3", first_name: "Yossi", last_name: "Levy" },
        { _id: "4", first_name: "Michal", last_name: "Abraham" },
      ],
    },
    {
      id: 3,
      subject: "History",
      grade: "10",
      date: "2024-03-17",
      day: "Thursday",
      startTime: "16:00",
      endTime: "17:00",
      mentor: "Danny Levy",
      description: "History lesson",
      students: [
        { _id: "5", first_name: "Noa", last_name: "Cohen" },
        { _id: "6", first_name: "Eden", last_name: "Abraham" },
      ],
    },
  ];

  const handleLessonPress = (lesson) => {
    setSelectedLesson(lesson);
    setIsReviewModalVisible(true);
  };

  const handleSubmitReview = (reviewData) => {
    console.log("Review submitted:", reviewData);
    // Here you would send the review data to your backend
    setIsReviewModalVisible(false);
  };

  // Render the appropriate review component based on user role
  const renderReviewComponent = () => {
    if (!selectedLesson) return null;

    if (user?.role === "mentor") {
      return (
        <LessonReviewMentor
          visible={isReviewModalVisible}
          onClose={() => setIsReviewModalVisible(false)}
          onSubmit={handleSubmitReview}
          {...selectedLesson}
        />
      );
    } else if (user?.role === "student") {
      return (
        <LessonReviewStudent
          visible={isReviewModalVisible}
          onClose={() => setIsReviewModalVisible(false)}
          onSubmit={handleSubmitReview}
          {...selectedLesson}
        />
      );
    }

    return null;
  };

  const renderLessonItem = ({ item }) => (
    <LessonCard
      {...item}
      onPress={() => handleLessonPress(item)}
    />
  );

  return (
    <View className="flex-1 bg-primary px-5 py-6">
      <Text className="text-2xl font-bold text-white mb-6">
        My Lessons
      </Text>
      <FlatList
        data={mockLessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {renderReviewComponent()}
    </View>
  );
}

const styles = StyleSheet.create({});