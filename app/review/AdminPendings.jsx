import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useLesson } from "@context/LessonContext";
import ReviewCard from "@components/ReviewCard"; // You’ll need to implement this

export default function AdminPendings() {
  const { pendingReviews, fetchPendingReviews } = useLesson();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPendingReviews();
    setIsRefreshing(false);
  };


  useEffect(() => {
    handleRefresh();// Assume this fetches mentor-submitted reviews pending moderation
  }, []);

  const renderItem = ({ item }) => (
    <ReviewCard 
      review={item} 
      onReviewComplete={handleRefresh}
    />
  );

  return (
    <View className="flex-1 bg-primary px-5 py-6">
      <Text className="text-2xl font-bold text-white mb-6 text-center">
        Reviews to Moderate
      </Text>

      <FlatList
        data={pendingReviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={
          <Text className="text-white text-center mt-10">No pending reviews.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});