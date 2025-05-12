import React from "react";
import { View, Text } from "react-native";
import RequestModal from "./RequestModal";
import Icon from "react-native-vector-icons/MaterialIcons";

const MentorOverviewModal = ({ visible, onClose, mentor }) => {
  if (!mentor) return null;

  const {
    fullName,
    mentorEmail,
    averageScore,
    totalCompletedLessons,
    // reviewAverages
  } = mentor;

  return (
    <RequestModal visible={visible} onClose={onClose}>
      <View className="p-4 bg-gray-900 rounded-lg">
        <Text className="text-xl font-semibold text-white mb-4 text-center">
          Mentor Overview
        </Text>

        <Text className="text-base text-white mb-2">
          <Text className="font-bold">Name:</Text> {fullName}
        </Text>

        <Text className="text-base text-white mb-2">
          <Text className="font-bold">Email:</Text> {mentorEmail}
        </Text>

        <View className="flex-row items-center mb-2">
          <Icon name="star" size={18} color="#FFD700" />
          <Text className="text-base text-yellow-300 ml-1">
            {averageScore.toFixed(1)} / 5 average rating
          </Text>
        </View>

        <Text className="text-base text-white mb-4">
          <Text className="font-bold">Completed Lessons:</Text> {totalCompletedLessons}
        </Text>

        {/*
        <View className="mt-2">
          <Text className="text-sm text-gray-400">Clarity: {reviewAverages?.clarity.toFixed(1)}</Text>
          <Text className="text-sm text-gray-400">Helpfulness: {reviewAverages?.helpfulness.toFixed(1)}</Text>
          <Text className="text-sm text-gray-400">Professionalism: {reviewAverages?.professionalism.toFixed(1)}</Text>
          <Text className="text-sm text-gray-400">Punctuality: {reviewAverages?.punctuality.toFixed(1)}</Text>
        </View>
        */}
      </View>
    </RequestModal>
  );
};

export default MentorOverviewModal;
