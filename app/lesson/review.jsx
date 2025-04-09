import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "@/context/AuthContext";
import LessonReviewMentor from "@/components/LessonReviewMentor";
import LessonReviewStudent from "@/components/LessonReviewStudent";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LessonReviewScreen() {
  const { user } = useAuth();
  const isMentor = user?.role === "mentor";

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      {isMentor ? <LessonReviewMentor /> : <LessonReviewStudent />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
}); 