import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import SelectField from "../../components/SelectField"; // נתיב לקומפוננטת SelectField
import DateSelector from "../../components/DateSelector"; // נתיב לקומפוננטת DateSelector
import TimeSelector from "../../components/TimeSelector"; // נתיב לקומפוננטת TimeSelector
import CustomButton from "../../components/CustomButton"; // נתיב לקומפוננטת CustomButton
import TextInputField from "../../components/TextInputField";
import RTLText from "../../components/RTLText";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import IconButton from "../../components/IconButton";

// מקצועות עם הקבצות
const subjectsWithGroups = {
  מתמטיקה: ["1", "2", "3"],
  אנגלית: ["א", "ב"],
  פיזיקה: ["מתקדמים", "בסיסי"],
};

// כל המקצועות
const subjects = [
  { label: "מתמטיקה", value: "מתמטיקה" },
  { label: "אנגלית", value: "אנגלית" },
  { label: "פיזיקה", value: "פיזיקה" },
  { label: "אזרחות", value: "אזרחות" },
  { label: "היסטוריה", value: "היסטוריה" },
  { label: "ספרות", value: "ספרות" },
];

// כיתות
const grades = [
  { label: "כיתה ז׳", value: "כיתה ז׳" },
  { label: "כיתה ח׳", value: "כיתה ח׳" },
  { label: "כיתה ט׳", value: "כיתה ט׳" },
];

const lessonTypes = [
  { label: "פרונטלי בבית ספר", value: "פרונטלי" },
  { label: "מקוון בזום", value: "מקוון" },
];

export default function TestPage() {
  const [subject, setSubject] = useState(""); // סטייט לשמירת מקצוע
  const [grade, setGrade] = useState(""); // סטייט לשמירת כיתה
  const [group, setGroup] = useState(""); // סטייט לשמירת הקבצה
  const [date, setDate] = useState(new Date()); // סטייט לשמירת התאריך הנבחר
  const [time, setTime] = useState(new Date()); // סטייט לשמירת השעה הנבחרת
  const [showDatePicker, setShowDatePicker] = useState(false); // סטייט לשליטה אם להציג את לוח השנה
  const [showTimePicker, setShowTimePicker] = useState(false); // סטייט לשליטה אם להציג את השעון
  const [lessonDescription, setLessonDescription] = useState(""); // סטייט לשמירת תיאור השיעור
  const [lessonType, setLessonType] = useState(""); // הוספת הסטייט של סוג השיעור
  const [lessonLocation, setLessonLocation] = useState(""); // סטייט לשמירת מיקום השיעור

  // פונקציה לשמירת שינויי מקצוע
  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  // פונקציה לשמירת שינויי כיתה
  const handleGradeChange = (value) => {
    setGrade(value);
  };

  // פונקציה לשמירת שינויי הקבצה
  const handleGroupChange = (value) => {
    setGroup(value);
  };

  // פונקציה לשמירת שינויי סוג השיעור
  const handleLessonTypeChange = (value) => {
    setLessonType(value);
  };

  const handleDateChange = (newDate) => {
    setShowDatePicker(false); // סוגר את לוח השנה אחרי בחירת תאריך
    setDate(newDate); // עדכון התאריך
  };

  const handleTimeChange = (newTime) => {
    setShowTimePicker(false); // סוגר את השעון אחרי בחירת שעה
    setTime(newTime); // עדכון השעה
  };

  // אפשרויות הקבצה לפי מקצוע
  const groupOptions = subjectsWithGroups[subject] || [];

  return (
    <View style={{ padding: 20 }}>
      {/* SelectField עבור מקצוע */}
      <SelectField
        label="📚 מקצוע:"
        selectedValue={subject}
        onValueChange={handleSubjectChange}
        options={subjects}
      />

      {/* SelectField עבור כיתה */}
      <SelectField
        label="🎓 כיתה:"
        selectedValue={grade}
        onValueChange={handleGradeChange}
        options={grades}
      />

      {/* SelectField עבור הקבצה */}
      {groupOptions.length > 0 ? (
        <SelectField
          label="🧑‍🏫 הקבצה:"
          selectedValue={group}
          onValueChange={handleGroupChange}
          options={groupOptions.map((g) => ({ label: g, value: g }))}
        />
      ) : (
        <Text style={{ textAlign: "right", marginTop: 10 }}>הקבצה: כללי</Text>
      )}

      {/* תיאור השיעור */}
      <TextInputField
        label="📝 תיאור השיעור:"
        value={lessonDescription}
        onChangeText={setLessonDescription}
        placeholder="הכנס תיאור לשיעור"
        multiline={true}
      />

      {/* RadioButton עבור סוג שיעור */}
      <RadioButtonGroup
        label="💻 סוג שיעור:"
        options={lessonTypes}
        selectedValue={lessonType}
        onValueChange={handleLessonTypeChange}
      />

      <TextInputField
        label="📍 מיקום השיעור:"
        value={lessonLocation}
        onChangeText={setLessonLocation}
        placeholder="הכנס מיקום או קישור לזום"
      />
      <View style={{ marginBottom: 20 }}>
        {/* כפתור "בחר תאריך" עם אייקון */}
        <IconButton
          onPress={() => setShowDatePicker(true)}
          icon="calendar"
          title="תאריך"
          style={{ marginBottom: 10 }} // רווח בין הכפתור הראשון לשני
        />
        {/* כפתור "בחר שעה" עם אייקון */}
        <IconButton
          onPress={() => setShowTimePicker(true)}
          icon="clock"
          title="שעה"
        />
      </View>

      {/* הצגת תאריך ושעה */}
      {showDatePicker && (
        <DateSelector date={date} setDate={handleDateChange} />
      )}
      {showTimePicker && (
        <TimeSelector time={time} setTime={handleTimeChange} />
      )}

      {/* הצגת התאריך והשעה שנבחרו */}
      <View style={{ marginTop: 20 }}>
        <RTLText>תאריך נבחר: {date.toLocaleDateString()}</RTLText>
        <RTLText>
          שעה נבחרת: {time.getHours()}:
          {time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}
        </RTLText>
      </View>
    </View>
  );
}
