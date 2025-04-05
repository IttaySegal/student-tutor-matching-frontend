import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import LessonCard from "../../components/LessonCard"; // ייבוא קומפוננטת כרטיס שיעור
import RTLText from "../../components/RTLText"; // לוודא שיש לך את RTLText
import PageHeader from "../../components/PageHeader";

// נתונים דמויים לשיעורים של חניך/חונך
const dummyLessons = [
  {
    id: 1,
    subject: "מתמטיקה",
    grade: "ח",
    group: "2",
    date: "2.4.2025",
    startTime: "14:00",
    endTime: "15:00",
    mentor: "יוסי כהן",
    description: "פתרון מבחן בנושא חזקות ושורשים",
    students: ["דניאל", "נועם", "שירה"], // תלמידים
    isMentor: false, // חניך
  },
  {
    id: 2,
    subject: "מתמטיקה",
    grade: "ח",
    group: "2",
    date: "3.4.2025",
    startTime: "15:00",
    endTime: "16:00",
    mentor: "נועה ברק",
    description: "חזרה על נושאים לבגרות",
    students: ["תמר", "רועי"], // תלמידים
    isMentor: false, // חניך
  },
  {
    id: 3,
    subject: "פיזיקה",
    grade: "ח",
    group: "1",
    date: "4.4.2025",
    startTime: "12:00",
    endTime: "13:00",
    mentor: "יואב לוי",
    description: "שיעור תרגול במודול טריגונומטריה",
    students: ["יובל", "ליה"], // תלמידים
    isMentor: true, // חונך
  },
  {
    id: 4,
    subject: "מתמטיקה",
    grade: "ח",
    group: "2",
    date: "5.4.2025",
    startTime: "11:00",
    endTime: "12:00",
    mentor: "גלית בר",
    description: "חזרה על חקירת פונקציות",
    students: ["עומר", "רוני"], // תלמידים
    isMentor: false, // חניך
  },
  {
    id: 5,
    subject: "מתמטיקה",
    grade: "ח",
    group: "2",
    date: "6.4.2025",
    startTime: "13:00",
    endTime: "14:00",
    mentor: "עידו כספי",
    description: "תרגול משוואות ריבועיות",
    students: ["ליהי", "אורי"], // תלמידים
    isMentor: false, // חניך
  },
  {
    id: 6,
    subject: "מתמטיקה",
    grade: "ח",
    group: "2",
    date: "7.4.2025",
    startTime: "15:00",
    endTime: "16:00",
    mentor: "רונית כהן",
    description: "עבודה בקבוצות על בעיות מילוליות",
    students: ["שחר", "מיכל"], // תלמידים
    isMentor: false, // חניך
  },
];

const MyLessonsScreen = () => {
  const [lessons, setLessons] = useState(dummyLessons);

  return (
    <View className="flex-1 bg-primary px-4 py-6">
      <PageHeader title="השיעורים שלי" />

      {lessons.length > 0 ? (
        <FlatList
          data={lessons}
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

export default MyLessonsScreen;
