import { View, ScrollView } from "react-native";
import LessonCard from "../components/LessonCard";

export default function TestCard() {
  return (
    <ScrollView
      className="flex-1 bg-primary px-4 pt-10"
      contentContainerStyle={{ paddingBottom: 50 }}
      style={{ direction: "rtl" }}
    >
      <View className="mb-4">
        <LessonCard
          subject="מתמטיקה"
          grade="כיתה ח'"
          day="יום שלישי"
          date="4 באפריל"
          startTime="16:00"
          endTime="17:00"
          mentor="שרה לוי"
          description="בשיעור נתרגל משוואות עם נעלם אחד ונחזור על חיבור שברים."
          students={["דנה", "יותם", "ליאור"]}
          isMentor={false}
        />
      </View>

      <View className="mb-4">
        <LessonCard
          subject="אנגלית"
          grade="כיתה ז'"
          day="יום רביעי"
          date="5 באפריל"
          startTime="14:00"
          endTime="15:00"
          mentor="תום כהן"
          description="שיעור על זמנים באנגלית. Past Simple ו-Present Perfect."
          students={["נועם", "אור", "רומי"]}
          isMentor={true}
        />
      </View>

      <View className="mb-4">
        <LessonCard
          subject="היסטוריה"
          grade="כיתה ט'"
          day="יום חמישי"
          date="6 באפריל"
          startTime="12:00"
          endTime="13:30"
          mentor="רונית יוסף"
          description="דיון על מלחמות העולם והשפעתן על מדינת ישראל."
          students={["גל", "עומר", "טל"]}
          isMentor={false}
        />
      </View>
    </ScrollView>
  );
}
