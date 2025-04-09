import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import RTLText from "./RTLText";

export default function LessonCard({
  subject,
  grade,
  date,
  day,
  startTime,
  endTime,
  mentor,
  description,
  students,
  lessonLocation,
  ModalComponent,
  modalProps = {},
  onPress,
  ...props
}) {
  const [visible, setVisible] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (ModalComponent) {
      setVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        style={styles.lessonItem}
      >
        <View style={styles.lessonHeader}>
          <RTLText style={styles.subject}>{subject}</RTLText>
          <RTLText style={styles.grade}>כיתה {grade}</RTLText>
        </View>
        <View style={styles.lessonDetails}>
          <RTLText style={styles.date}>
            {day}, {date}
          </RTLText>
          <RTLText style={styles.time}>
            {startTime} - {endTime}
          </RTLText>
        </View>
        <RTLText style={styles.mentor}>מנטור: {mentor}</RTLText>
        <RTLText style={styles.description}>{description}</RTLText>
      </TouchableOpacity>

      {ModalComponent && (
        <ModalComponent
          visible={visible}
          onClose={() => setVisible(false)}
          subject={subject}
          grade={grade}
          date={date}
          day={day}
          startTime={startTime}
          endTime={endTime}
          mentor={mentor}
          description={description}
          students={students}
          lessonLocation={lessonLocation}
          {...modalProps}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  lessonItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  grade: {
    fontSize: 16,
    color: "#666",
  },
  lessonDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  mentor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
