import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import LessonCard from "../components/LessonCard";

const SearchLessonsScreen = () => {
  const [results, setResults] = useState([]);

  const dummyResults = [
    {
      id: 1,
      subject: "מתמטיקה",
      grade: "ח",
      group: "2",
      date: "2.4.2025",
      day: "רביעי",
      startTime: "14:00",
      endTime: "15:00",
      mentor: "יוסי כהן",
      description: "פתרון מבחן בנושא חזקות ושורשים",
      students: ["דניאל", "נועם", "שירה"],
      isMentor: false,
    },
    {
      id: 2,
      subject: "מתמטיקה",
      grade: "ח",
      group: "2",
      date: "3.4.2025",
      day: "חמישי",
      startTime: "15:00",
      endTime: "16:00",
      mentor: "נועה ברק",
      description: "חזרה על נושאים לבגרות",
      students: ["תמר", "רועי"],
      isMentor: false,
    },
    {
      id: 3,
      subject: "מתמטיקה",
      grade: "ח",
      group: "2",
      date: "4.4.2025",
      day: "שישי",
      startTime: "12:00",
      endTime: "13:00",
      mentor: "יואב לוי",
      description: "שיעור תרגול במודול טריגונומטריה",
      students: ["יובל", "ליה"],
      isMentor: false,
    },
    {
      id: 4,
      subject: "מתמטיקה",
      grade: "ח",
      group: "2",
      date: "5.4.2025",
      day: "שבת",
      startTime: "11:00",
      endTime: "12:00",
      mentor: "גלית בר",
      description: "חזרה על חקירת פונקציות",
      students: ["עומר", "רוני"],
      isMentor: false,
    },
    {
      id: 5,
      subject: "מתמטיקה",
      grade: "ח",
      group: "2",
      date: "6.4.2025",
      day: "ראשון",
      startTime: "13:00",
      endTime: "14:00",
      mentor: "עידו כספי",
      description: "תרגול משוואות ריבועיות",
      students: ["ליהי", "אורי"],
      isMentor: false,
    },
    {
      id: 6,
      subject: "מתמטיקה",
      grade: "ח",
      group: "2",
      date: "7.4.2025",
      day: "שני",
      startTime: "15:00",
      endTime: "16:00",
      mentor: "רונית כהן",
      description: "עבודה בקבוצות על בעיות מילוליות",
      students: ["שחר", "מיכל"],
      isMentor: false,
    },
  ];

  const normalizeGrade = (grade) => {
    if (!grade) return "";
    return grade.replace("כיתה ", "").replace("׳", "").trim();
  };

  const handleSearch = ({ subject, grade, group }) => {
    const normalizedGrade = normalizeGrade(grade);
    const filtered = dummyResults.filter((lesson) => {
      const matchSubject = !subject || lesson.subject === subject;
      const matchGrade = !grade || lesson.grade === normalizedGrade;
      const matchGroup =
        !group || lesson.group === group || (!lesson.group && group === "כללי");
      return matchSubject && matchGrade && matchGroup;
    });

    setResults(filtered);
  };

  return (
    <View className="flex-1 bg-primary px-4 py-6">
      <SearchBar onSearch={handleSearch} />

      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mb-3">
              <LessonCard {...item} />
            </View>
          )}
        />
      ) : (
        <Text className="text-center text-gray-200 mt-10">
          אין שיעורים להצגה
        </Text>
      )}
    </View>
  );
};

export default SearchLessonsScreen;
