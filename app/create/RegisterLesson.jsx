import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchBar from "@components/SearchBar";
import LessonCard from "@components/LessonCard";
import LessonDetailsModal from "@components/LessonDetailsModal";
import { useLesson } from "@context/LessonContext";

const RegisterLesson = () => {
  const {
    searchLessons,
    searchResults,
    modalVisible,
    selectedLesson,
    setSelectedLesson,
    setModalVisible,
  } = useLesson();

  const [isSearching, setIsSearching] = useState(false); // 🆕 סטייט לטעינה

  const handleSearch = async ({ subject, grade, group }) => {
    setIsSearching(true);
    try {
      await searchLessons({ subject, grade, group });
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };
  

  return (
    <View className="flex-1 bg-primary">
      {/* שליחת הפונקציה + מצב טעינה ל-SearchBar */}
      <SearchBar onSearch={handleSearch} isLoading={isSearching} />
     
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <LessonCard
                {...item}
                onPress={() => {
                  setSelectedLesson(item);
                  setModalVisible(true);
                }}
              />
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No lessons to display</Text>
      )}

      {modalVisible && (
        <LessonDetailsModal
          lesson={selectedLesson}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
  },
});

export default RegisterLesson;
