import React, { useEffect } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";
import LessonReviewMentor from "../../components/LessonReviewMentor";
import LessonReviewStudent from "../../components/LessonReviewStudent";

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
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => handleLessonPress(item)}
    >
      <View style={styles.lessonHeader}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.grade}>Grade {item.grade}</Text>
      </View>
      <View style={styles.lessonDetails}>
        <Text style={styles.date}>
          {item.day}, {item.date}
        </Text>
        <Text style={styles.time}>
          {item.startTime} - {item.endTime}
        </Text>
      </View>
      <Text style={styles.mentor}>Mentor: {item.mentor}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockLessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      {renderReviewComponent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 16,
  },
  lessonItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  grade: {
    fontSize: 16,
    color: "#666",
  },
  lessonDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  mentor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});