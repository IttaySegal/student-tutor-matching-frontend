import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import RegisterLesson from "@/app/create/RegisterLesson";
import CreateLesson from "@/app/create/CreateLesson";

export default function CreateScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-primary px-5 py-6">
      <Text className="text-2xl font-bold text-white mb-6 text-center">
        {user?.role === "mentor" ? "Create Lesson" : "Register for Lesson"}
      </Text>
      {user?.role === "mentor" ? <CreateLesson /> : <RegisterLesson />}
    </View>
  );
}

const styles = StyleSheet.create({});
