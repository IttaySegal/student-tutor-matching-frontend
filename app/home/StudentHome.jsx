import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import LessonCard from "../../components/LessonCard"; // נוודא שהנתיב נכון
import RTLText from "../../components/RTLText"; // לוודא שיש לך את RTLText כמו קודם

const StudentHome = ({ userName }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "בוקר טוב";
    if (currentHour < 17) return "צהריים טובים";
    if (currentHour < 20) return "ערב טוב";
    return "לילה טוב";
  };

  // דוגמת נתונים לשיעור אחרון ושיעור הבא
  const lastLesson = {
    subject: "מתמטיקה",
    grade: "ח",
    date: "2.4.2025",
    day: "רביעי",
    startTime: "14:00",
    endTime: "15:00",
    mentor: "יוסי כהן",
    description: "פתרון מבחן בנושא חזקות ושורשים",
    students: ["דניאל", "נועם", "שירה"],
    isMentor: false,
  };

  const nextLesson = {
    subject: "אנגלית",
    grade: "ח",
    date: "3.4.2025",
    day: "חמישי",
    startTime: "15:00",
    endTime: "16:00",
    mentor: "נועה ברק",
    description: "חזרה על נושאים לבגרות",
    students: ["תמר", "רועי"],
    isMentor: false,
  };

  return (
    <View style={styles.container}>
      {/* כותרת עם ברכת שלום */}
      <RTLText style={styles.title}>
        {getGreeting()}, {userName}
      </RTLText>

      {/* תיאור נוסף */}
      <RTLText style={styles.description}>
        כאן תוכל למצוא את כל השיעורים המתאימים לך ולהירשם אליהם.
      </RTLText>

      <ScrollView style={styles.lessonContainer}>
        {/* כרטיס שיעור אחרון */}
        <View style={styles.lessonCardContainer}>
          <RTLText style={styles.lessonTitle}>שיעור אחרון:</RTLText>
          <LessonCard {...lastLesson} />
        </View>

        {/* כרטיס שיעור הבא */}
        <View style={styles.lessonCardContainer}>
          <RTLText style={styles.lessonTitle}>שיעור הבא:</RTLText>
          <LessonCard {...nextLesson} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right", // RTL text alignment
  },
  description: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "right", // RTL text alignment
  },
  lessonContainer: {
    marginTop: 40,
  },
  lessonCardContainer: {
    marginBottom: 20,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right", // RTL text alignment
    marginBottom: 10,
  },
});

export default StudentHome;
