import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchBar from "@components/SearchBar";
import LessonCard from "@components/LessonCard";
import { mockSearchResults } from "@mocks/mockLessons";
import { searchLessons } from "@services/lessonService";
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

  const normalizeGrade = (grade) => {
    if (!grade) return "";
    return grade.replace("כיתה ", "").replace("׳", "").trim();
  };
  const handleSearch = ({ subject, grade, group }) => {
    const normalizedGrade = normalizeGrade(grade);
    searchLessons({ subject, grade: normalizedGrade, group });
  };

  return (
    <View className="flex-1 bg-primary">
      <SearchBar onSearch={handleSearch} />
  
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
  
      {/* 👇 Render the modal only if visible */}
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
