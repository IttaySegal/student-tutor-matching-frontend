import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useLesson } from "@context/LessonContext";
import LessonReviewMentor from "../../components/LessonReviewMentor";
import LessonReviewStudent from "../../components/LessonReviewStudent";
import LessonCard from "../../components/LessonCard";

export default function MyLessonSscreen() {
  const { user } = useAuth();
  const {
    mentorLessons,
    studentLessons,
    fetchMentorLessons,
    fetchStudentLessons,
  } = useLesson();
  const [selectedLesson, setSelectedLesson] = React.useState(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = React.useState(false);
  useEffect(() => {
    if (user?.role === "mentor") {
      console.log("📡 Fetching mentor lessons...");
      fetchMentorLessons().then(() => {
        console.log("🎓 mentorLessons:", mentorLessons);
      });
    } else if (user?.role === "student") {
      console.log("📡 Fetching student lessons...");
      fetchStudentLessons().then(() => {
        console.log("🎓 studentLessons:", studentLessons);
      });
    }
  }, []); 
  // Mock data for testing - replace with actual data from your backend

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
          <Text className="text-white text-center mt-10">No lessons found.</Text>
        }
      />
      {renderReviewComponent()}
    </View>
  );
}

const styles = StyleSheet.create({});