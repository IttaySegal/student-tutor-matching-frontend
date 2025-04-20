import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function StarRatingQuestion({ title, question, value, setValue }) {
  return (
    <View className="w-full mb-6">
      <Text className="text-base font-bold text-gray-800 mb-1">{title}</Text>
      <Text className="text-sm text-gray-600 mb-2">{question}</Text>
      <View className="flex-row justify-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setValue(star)}>
            <Text className="text-3xl" style={{ color: star <= value ? "#FFD700" : "#E5E7EB" }}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
