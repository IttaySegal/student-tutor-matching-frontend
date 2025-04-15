import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

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
          <Text style={styles.subject}>{subject}</Text>
          <Text style={styles.grade}>Grade {grade}</Text>
        </View>
        <View style={styles.lessonDetails}>
          <Text style={styles.date}>
            {day}, {date}
          </Text>
          <Text style={styles.time}>
            {startTime} - {endTime}
          </Text>
        </View>
        <Text style={styles.mentor}>Mentor: {mentor}</Text>
        <Text style={styles.description}>{description}</Text>
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
          {...props}
          {...modalProps}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  lessonItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
  },
  grade: {
    fontSize: 16,
    color: "#666",
  },
  lessonDetails: {
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: "#444",
  },
  time: {
    fontSize: 16,
    color: "#444",
  },
  mentor: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
