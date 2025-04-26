import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { useLesson } from "../context/LessonContext";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { LessonReviewStudent } from "./LessonReviewStudent";

export const StudentPendings = () => {
  const { studentReviews, isLoadingStudentReviews, fetchStudentReviews } = useLesson();
  const { user } = useAuth();
  const navigation = useNavigation();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStudentReviews();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchStudentReviews();
    } catch (error) {
      console.error("Error refreshing reviews:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      await submitStudentReview(selectedLesson.id, reviewData);
      setSelectedLesson(null);
      await fetchStudentReviews(); // Refresh after submission
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (isLoadingStudentReviews && !refreshing) {
    return (
      <View style={styles.container}>
        <Text>Loading reviews...</Text>
      </View>
    );
  }

  if (studentReviews.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noReviewsText}>No pending reviews</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedLesson ? (
        <LessonReviewStudent
          lesson={selectedLesson}
          onSubmit={handleReviewSubmit}
          onCancel={() => setSelectedLesson(null)}
        />
      ) : (
        <FlatList
          data={studentReviews}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary.main]}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.reviewItem}
              onPress={() => setSelectedLesson(item)}
            >
              <View style={styles.reviewHeader}>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <View style={styles.reviewDetails}>
                <Text style={styles.mentorText}>Mentor: {item.mentor}</Text>
                <Text style={styles.timeText}>
                  {item.startTime} - {item.endTime}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background.primary,
  },
  noReviewsText: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: 20,
  },
  reviewItem: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewHeader: {
    flex: 1,
  },
  subjectText: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 4,
  },
  dateText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  reviewDetails: {
    flex: 1,
    marginLeft: 16,
  },
  mentorText: {
    ...typography.body2,
    color: colors.text.primary,
    marginBottom: 4,
  },
  timeText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
}); 