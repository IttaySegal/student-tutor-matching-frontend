import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
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
        className="bg-white rounded-xl shadow-md p-4 w-full max-w-md mx-auto"
      >
        <View style={{ direction: "rtl", alignItems: "flex-start" }}>
          <RTLText style={{ fontWeight: "bold", fontSize: 16 }}>
            שיעור ב{subject} – {grade}
          </RTLText>
          <RTLText>
            {day}, {date}
          </RTLText>
          <RTLText>
            משעה {startTime} עד {endTime}
          </RTLText>
          <RTLText>החונך: {mentor}</RTLText>
        </View>
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
