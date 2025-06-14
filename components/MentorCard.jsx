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
          <Text className="text-sm text-yellow-300">
            {totalCompletedLessons > 0
              ? `${averageScore} / 5`
              : "No ratings yet"}
          </Text>
        </View>

        <Text className="text-sm text-gray-400">
        Lessons: {typeof totalCompletedLessons === "number" ? totalCompletedLessons : 0}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MentorCard;
