import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import RequestModal from "./RequestModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { fetchMentorAverageRating } from "@/services/adminService";

// Modal to display mentor overview and ratings
const MentorOverviewModal = ({ visible, onClose, mentor }) => {
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch detailed mentor ratings when modal is visible
  useEffect(() => {
    const loadRatings = async () => {
      if (!mentor?.mentorId) return;

      setLoading(true);
      try {
        const res = await fetchMentorAverageRating(mentor.mentorId);

        // Only set ratings if response is a non-empty object
        if (res && Object.keys(res).length > 0) {
          setRatings(res);
        } else {
          console.warn("Received empty rating object");
          setRatings(null);
        }
      } catch (err) {
        console.warn("Ratings not available");
        setRatings(null);
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      loadRatings();
    } else {
      setRatings(null); // Reset state when modal closes
    }
  }, [visible, mentor]);

  if (!mentor) return null;

  // Destructure mentor properties
  const {
    fullName,
    mentorEmail,
    averageScore,
    totalCompletedLessons,
  } = mentor;

  return (
    <RequestModal visible={visible} onClose={onClose}>
      <View className="p-4 bg-gray-900 rounded-lg">
        {/* Modal Title */}
        <Text className="text-xl font-semibold text-white mb-4 text-center">
          Mentor Overview
        </Text>

        {/* Mentor Name */}
        <Text className="text-base text-white mb-2">
          <Text className="font-bold">Name:</Text> {fullName}
        </Text>

        {/* Mentor Email */}
        <Text className="text-base text-white mb-2">
          <Text className="font-bold">Email:</Text> {mentorEmail}
        </Text>

        {/* Average Rating */}
        <View className="flex-row items-center mb-2">
          <Icon name="star" size={18} color="#FFD700" />
          <Text className="text-base text-yellow-300 ml-1">
            {Number.isFinite(averageScore) && totalCompletedLessons > 0
              ? `${averageScore.toFixed(1)} / 5 average rating`
              : "No ratings yet"}
          </Text>
        </View>

        {/* Completed Lessons */}
        <Text className="text-base text-white mb-4">
          <Text className="font-bold">Completed Lessons:</Text> {totalCompletedLessons}
        </Text>

        {/* Loading indicator for detailed ratings */}
        {loading && (
          <Text className="text-sm text-gray-400 mt-2">Loading detailed ratings...</Text>
        )}

        {/* Show detailed ratings if available, otherwise show fallback */}
        {!loading && ratings ? (
          <View className="mt-2">
            {/* Clarity Rating */}
            <Text className="text-sm text-gray-400">
              Clarity: {ratings?.clarity > 0 ? ratings.clarity.toFixed(1) : "N/A"}
            </Text>
            {/* Understanding Rating */}
            <Text className="text-sm text-gray-400">
              Understanding: {ratings?.understanding > 0 ? ratings.understanding.toFixed(1) : "N/A"}
            </Text>
            {/* Focus Rating */}
            <Text className="text-sm text-gray-400">
              Focus: {ratings?.focus > 0 ? ratings.focus.toFixed(1) : "N/A"}
            </Text>
            {/* Helpfulness Rating */}
            <Text className="text-sm text-gray-400">
              Helpfulness: {ratings?.helpful > 0 ? ratings.helpful.toFixed(1) : "N/A"}
            </Text>
          </View>
        ) : !loading && (
          // Fallback if no detailed ratings
          <Text className="text-sm text-gray-500 mt-2">
            No detailed mentor ratings available.
          </Text>
        )}
      </View>
    </RequestModal>
  );
};

export default MentorOverviewModal;
