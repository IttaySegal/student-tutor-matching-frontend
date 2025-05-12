import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const MentorCard = ({ fullName, email, averageScore, totalCompletedLessons, onPress /*, reviewAverages */ }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700"
    >
      <Text className="text-lg font-semibold text-white mb-1">{fullName}</Text>
      <Text className="text-sm text-gray-300 mb-2">{email}</Text>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-1">
          <Icon name="star" size={18} color="#FFD700" />
          <Text className="text-sm text-yellow-300">{averageScore.toFixed(1)} / 5</Text>
        </View>
        <Text className="text-sm text-gray-400">Lessons: {totalCompletedLessons}</Text>
      </View>

      {/* 
      <View className="mt-2">
        <Text className="text-xs text-gray-400">Clarity: {reviewAverages?.clarity.toFixed(1)}</Text>
        <Text className="text-xs text-gray-400">Helpfulness: {reviewAverages?.helpfulness.toFixed(1)}</Text>
        <Text className="text-xs text-gray-400">Professionalism: {reviewAverages?.professionalism.toFixed(1)}</Text>
        <Text className="text-xs text-gray-400">Punctuality: {reviewAverages?.punctuality.toFixed(1)}</Text>
      </View>
      */}
    </TouchableOpacity>
  );
};

export default MentorCard;
