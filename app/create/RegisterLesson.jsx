import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchBar from "@components/SearchBar";
import LessonCard from "@components/LessonCard";
import { mockSearchResults } from "@mocks/mockLessons";
import { searchLessons } from "@services/lessonService";
import LessonDetailsModal from "@components/LessonDetailsModal";
import { useLesson } from "@context/LessonContext";

const RegisterLesson = () => {
  const [results, setResults] = useState([]);
  //const [loading, setLoading] = useState(false);

  const normalizeGrade = (grade) => {
    if (!grade) return "";
    return grade.replace("כיתה ", "").replace("׳", "").trim();
  };

  const handleSearch = ({ subject, grade, group }) => {
    const normalizedGrade = normalizeGrade(grade);
    const filtered = mockSearchResults.filter((lesson) => {
      const matchSubject = !subject || lesson.subject === subject;
      const matchGrade = !grade || lesson.grade === normalizedGrade;
      const matchGroup =
        !group || lesson.group === group || (!lesson.group && group === "כללי");
      return matchSubject && matchGrade && matchGroup;
    });

    setResults(filtered);
  };
  // const handleSearch = async ({ subject, grade, group }) => {
  //   setLoading(true);
  //   try {
  //     const token = await AsyncStorage.getItem("accessToken");
  //     if (!token) throw new Error("לא נמצא טוקן");

  //     const lessons = await searchLessons({ subject, grade, group }, token); // 🔥 קריאה אמיתית
  //     setResults(lessons);
  //   } catch (err) {
  //     console.error("שגיאה בחיפוש שיעורים:", err.message);
  //     Alert.alert("שגיאה", err.message || "אירעה שגיאה בעת חיפוש שיעורים");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View className="flex-1 bg-primary">
      <SearchBar onSearch={handleSearch} />

      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <LessonCard {...item} ModalComponent={LessonDetailsModal} />
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>
          No lessons to display
        </Text>
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
