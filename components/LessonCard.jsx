import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import RTLText from "./RTLText";
import LessonDetailsModal from "./LessonDetailsModal";

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
  isMentor,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
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
          <RTLText>
            החונכ{isMentor ? "ת" : ""}: {mentor}
          </RTLText>
        </View>
      </TouchableOpacity>

      <LessonDetailsModal
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
        isMentor={isMentor}
      />
    </>
  );
}
