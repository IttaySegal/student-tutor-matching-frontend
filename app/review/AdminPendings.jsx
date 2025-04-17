import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { useLesson } from "@context/LessonContext";
import LessonCard from "@components/LessonCard";
import ReviewCard from "@components/ReviewCard";

export default function AdminPendings() {
  const { pendingReviews, fetchPendingReviews } = useLesson();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPendingReviews();
    setIsRefreshing(false);
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleLessonPress = (review) => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  return (
    <View className="flex-1 bg-primary px-5 py-6">
      <Text className="text-2xl font-bold text-white mb-6 text-center">
        Reviews to Moderate
      </Text>

      <FlatList
        data={pendingReviews}
        renderItem={({ item }) => (
          <LessonCard
            {...item}
            onPress={() => handleLessonPress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={
          <Text className="text-white text-center mt-10">No pending reviews.</Text>
        }
      />

      {modalVisible && selectedReview && (
        <ReviewCard
          visible={modalVisible}
          review={selectedReview}
          onClose={() => {
            setModalVisible(false);
            setSelectedReview(null);
          }}
          onReviewComplete={handleRefresh}
        />
      )}
    </View>
  );
}
