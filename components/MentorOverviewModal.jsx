import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import RequestModal from "./RequestModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { fetchMentorAverageRating } from "@/services/adminService";

const MentorOverviewModal = ({ visible, onClose, mentor }) => {
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRatings = async () => {
      if (!mentor?.mentorId) return;

      setLoading(true);
      try {
        const res = await fetchMentorAverageRating(mentor.mentorId);

        // Check if the response is non-empty object
        if (res && Object.keys(res).length > 0) {
          setRatings(res);
        } else {
          console.warn("⚠️ Received empty rating object");
          setRatings(null); // Treat empty as unavailable
        }
      } catch (err) {
        console.warn("⚠️ Ratings not available – likely not an admin");
        setRatings(null);
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      loadRatings();
    } else {
      setRatings(null); // reset state when modal closes
    }
  }, [visible, mentor]);

  if (!mentor) return null;

  const {
    fullName,
    mentorEmail,
    averageScore,
    totalCompletedLessons,
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
            {averageScore?.toFixed(1) || "N/A"} / 5 average rating
          </Text>
        </View>

        <Text className="text-base text-white mb-4">
          <Text className="font-bold">Completed Lessons:</Text> {totalCompletedLessons}
        </Text>

        {loading && (
          <Text className="text-sm text-gray-400 mt-2">Loading detailed ratings...</Text>
        )}

        {!loading && ratings ? (
          <View className="mt-2">
            <Text className="text-sm text-gray-400">Clarity: {ratings.clarity?.toFixed(1) ?? "N/A"}</Text>
            <Text className="text-sm text-gray-400">Understanding: {ratings.understanding?.toFixed(1) ?? "N/A"}</Text>
            <Text className="text-sm text-gray-400">Focus: {ratings.focus?.toFixed(1) ?? "N/A"}</Text>
            <Text className="text-sm text-gray-400">Helpfulness: {ratings.helpful?.toFixed(1) ?? "N/A"}</Text>
          </View>
        ) : !loading && (
          <Text className="text-sm text-gray-500 mt-2">
            No detailed mentor ratings available.
          </Text>
        )}
      </View>
    </RequestModal>
  );
};

export default MentorOverviewModal;
