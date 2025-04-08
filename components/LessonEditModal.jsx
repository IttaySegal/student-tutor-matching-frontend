import React, { useState, useEffect } from "react";
import { View, Modal } from "react-native";
import RTLText from "./RTLText"; // מותאם לתצוגה בשפה עברית
import CustomButton from "./CustomButton"; // כפתורים מותאמים אישית
import TextInputField from "../components/TextInputField"; // שדה טקסט לעריכת תיאור השיעור
import { useAuth } from "../context/AuthContext";

export default function LessonEditModal({
  visible,
  onClose,
  subject,
  grade,
  date,
  day,
  startTime,
  endTime,
  mentor,
  description,
  students = [],
  lessonLocation,
  onSaveChanges,
  onDeleteLesson,
}) {
  const [localDescription, setLocalDescription] = useState(description || ""); // הוספת state לתיאור השיעור
  const [localLocation, setLocalLocation] = useState(lessonLocation || ""); // הוספת state למיקום השיעור

  const { user } = useAuth();

  useEffect(() => {
    setLocalDescription(description); // מעדכן את התיאור כל פעם כשמתקבל פרופ חדש
    setLocalLocation(lessonLocation); // עדכון מיקום השיעור
  }, [description, lessonLocation]);

  const handleSave = () => {
    onSaveChanges(localDescription, localLocation); // שמירה של השינויים
    onClose(); // סגירת המודל
  };

  const handleDescriptionChange = (text) => {
    setLocalDescription(text); // עדכון תיאור השיעור
  };

  // ברגע שהמשתמש לוחץ "ביטול שיעור", נבצע מחיקה
  const handleDelete = () => {
    onDeleteLesson();
    onClose(); // סגירת המודל
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
        <View
          className="bg-white rounded-2xl p-6 w-11/12 max-w-md"
          style={{ direction: "rtl", alignItems: "flex-start" }}
        >
          <RTLText
            style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}
          >
            ערוך שיעור ב{subject} – {grade}
          </RTLText>
          <RTLText style={{ fontSize: 16, marginBottom: 10 }}>
            {day}, {date}
          </RTLText>
          <RTLText style={{ fontSize: 16, marginBottom: 10 }}>
            משעה {startTime} עד {endTime}
          </RTLText>
          <RTLText style={{ fontSize: 16, marginBottom: 10 }}>
            החונך: {mentor}
          </RTLText>

          {/* תיאור השיעור */}
          <TextInputField
            label="📝 תיאור השיעור:"
            value={localDescription} // ודא שהערך נכון
            onChangeText={(text) => setLocalDescription(text)} // עדכון ה-description כאשר השדה משתנה
            placeholder="הכנס תיאור לשיעור"
            multiline={true}
            style={{ width: "100%", paddingHorizontal: 10 }}
          />

          {/* מיקום השיעור */}
          <TextInputField
            label="📍 מיקום השיעור (או קישור לזום):"
            value={lessonLocation}
            onChangeText={(text) => onSaveChanges(description, text)} // שמירה של מיקום השיעור
            placeholder="הכנס מיקום או קישור"
          />

          <View className="w-full mt-8 items-center">
            <CustomButton
              title="שמור שינויים"
              handlePress={handleSave} // שמירה של השינויים
              containerStyles="w-4/5"
            />

            <CustomButton
              title="ביטול שיעור"
              handlePress={handleDelete} // מחיקת השיעור
              containerStyles="w-4/5 bg-red-500"
            />

            <CustomButton
              title="סגור"
              handlePress={onClose} // סגירת המודל בלי לשמור שינויים
              containerStyles="w-4/5 bg-gray-500 mt-6"
              textStyles="text-white"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
