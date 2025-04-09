import React, { useEffect } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import LessonReviewMentor from "../../components/LessonReviewMentor";
import LessonReviewStudent from "../../components/LessonReviewStudent";
import RTLText from "../../components/RTLText";

export default function BookmarkScreen() {
  const { user } = useAuth();
  const [selectedLesson, setSelectedLesson] = React.useState(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = React.useState(false);

  // Mock data for testing - replace with actual data from your backend
  const mockLessons = [
    {
      id: 1,
      subject: "מתמטיקה",
      grade: "ח",
      date: "2024-03-15",
      day: "שלישי",
      startTime: "14:00",
      endTime: "15:00",
      mentor: "ישראל ישראלי",
      description: "שיעור בחשבון",
      students: [
        { _id: "1", first_name: "דני", last_name: "כהן" },
        { _id: "2", first_name: "שרה", last_name: "לוי" },
      ],
    },
    {
      id: 2,
      subject: "אנגלית",
      grade: "ט",
      date: "2024-03-16",
      day: "רביעי",
      startTime: "15:30",
      endTime: "16:30",
      mentor: "שרה כהן",
      description: "שיעור באנגלית",
      students: [
        { _id: "3", first_name: "יוסי", last_name: "לוי" },
        { _id: "4", first_name: "מיכל", last_name: "אברהם" },
      ],
    },
    {
      id: 3,
      subject: "היסטוריה",
      grade: "י",
      date: "2024-03-17",
      day: "חמישי",
      startTime: "16:00",
      endTime: "17:00",
      mentor: "דני לוי",
      description: "שיעור בהיסטוריה",
      students: [
        { _id: "5", first_name: "נועה", last_name: "כהן" },
        { _id: "6", first_name: "עידן", last_name: "אברהם" },
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
        <RTLText style={styles.subject}>{item.subject}</RTLText>
        <RTLText style={styles.grade}>כיתה {item.grade}</RTLText>
      </View>
      <View style={styles.lessonDetails}>
        <RTLText style={styles.date}>
          {item.day}, {item.date}
        </RTLText>
        <RTLText style={styles.time}>
          {item.startTime} - {item.endTime}
        </RTLText>
      </View>
      <RTLText style={styles.mentor}>מנטור: {item.mentor}</RTLText>
      <RTLText style={styles.description}>{item.description}</RTLText>
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