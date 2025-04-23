import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchBar from "@components/SearchBar";
import LessonCard from "@components/LessonCard";
import LessonDetailsModal from "@components/LessonDetailsModal";
import { useLesson } from "@context/LessonContext";
import { useAuth } from "@context/AuthContext";

const RegisterLesson = () => {
  const { user } = useAuth();
  const {
    searchLessons,
    searchResults,
    modalVisible,
    selectedLesson,
    setSelectedLesson,
    setModalVisible,
  } = useLesson();

  const [isSearching, setIsSearching] = useState(false);
  const [lastSearchFilters, setLastSearchFilters] = useState(null);

  const handleSearch = async ({ subject, grade, level }) => { ///TODO - i dont understand why need to pass user id
    console.log("🔍 Search button clicked!");

    if (!subject|| !grade) {
      console.log("❗ Please select both subject and grade before searching.");
      return;
    }
  
    const transformedData = {
      subjectName: subject,
      grade: grade,
      level: level || "General",
    };
  
    console.log("🔎 Sending filters:", transformedData);
  
    setIsSearching(true);
    try {
      await searchLessons(transformedData);
      setLastSearchFilters(transformedData); // Store the last search filters
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLessonPress = (lesson) => {
    setSelectedLesson(lesson);
    setModalVisible(true);
  };

  const handleRegistrationSuccess = async () => {
    if (lastSearchFilters) {
      await searchLessons(lastSearchFilters); // Refresh the search results
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <SearchBar onSearch={handleSearch} isLoading={isSearching} />
     
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <LessonCard
                {...item}
                onPress={() => handleLessonPress(item)}
              />
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No lessons to display</Text>
      )}

      {modalVisible && selectedLesson && (
        <LessonDetailsModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setSelectedLesson(null);
          }}
          isMyLessons={false}
          onRegisterSuccess={handleRegistrationSuccess}
          {...selectedLesson}
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
