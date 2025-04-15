import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";
import { useLesson } from "@context/LessonContext";
import { useToast } from "@/context/ToastContext";


export default function ReviewCard({ review }) {
const { approveLesson, rejectLesson } = useLesson();
const { showToast } = useToast();

  const handleApprove = async () => {
    await approveLesson(review.id); 
    showToast({
        message: 'Lesson approved!',
        subMessage: 'Your lesson is now live 🎉',
        type: "success"
      });
      if (onReviewComplete) {
        onReviewComplete();
      }
  };

  const handleReject = async () => {
    await rejectLesson(review.id);
    showToast({
        message: 'Lesson regected',
        type: "info"
      });
      if (onReviewComplete) {
        onReviewComplete();
      }
    
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Lesson: {review.subject} - Grade {review.grade}</Text>
      <Text style={styles.subtitle}>Mentor: {review.mentor}</Text>
      <Text>Date: {review.date} | Time: {review.startTime} - {review.endTime}</Text>
      
      <Text style={styles.sectionTitle}>Descriptions:</Text>
      {review.selectedDescriptions.map((desc, i) => (
        <Text key={i} style={styles.item}>• {desc}</Text>
      ))}

      <Text style={styles.sectionTitle}>Attendance:</Text>
      {Object.entries(review.studentAttendance).map(([id, status], i) => (
        <Text key={i} style={styles.item}>• {review.studentNames?.[id] || id}: {status}</Text>
      ))}

      <Text style={styles.sectionTitle}>Rating: ⭐ {review.rating}/5</Text>

      <View style={styles.actions}>
        <CustomButton title="Approve" handlePress={handleApprove} containerStyles="w-1/2 mr-2 bg-green-500" />
        <CustomButton title="Reject" handlePress={handleReject} containerStyles="w-1/2 bg-red-500" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    color: "#444",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  item: {
    fontSize: 14,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    marginTop: 12,
  },
});
