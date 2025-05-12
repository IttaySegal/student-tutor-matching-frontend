import React, { useState } from "react";
import { View, Modal, ScrollView, Text, TextInput } from "react-native";
import CustomButton from "./CustomButton";
import CloseButton from "./CloseButton";
import RadioButtonGroup from "./RadioButtonGroup";
import { useLesson } from "@context/LessonContext";
import { useToast } from "@context/ToastContext";

export default function LessonReviewMentor({
  visible,
  onClose,
  subject,
  grade,
  date,
  day,
  startTime,
  endTime,
  students = [],
  id,
}) {
  const [lessonSummary, setLessonSummary] = useState("");
  const [studentAttendance, setStudentAttendance] = useState({});
  const { submitReview, fetchMentorLessons } = useLesson();
  const { showToast } = useToast();

  const attendanceOptions = [
    { label: "Present", value: "Present" },
    { label: "Absent", value: "Absent" },
  ];

  const handleAttendanceChange = (studentId, value) => {
    setStudentAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };


  const handleSubmit = async () => {
    console.log("Student Attendance State:", studentAttendance);

    const presenceArray = students.map((student) => ({
      tuteeUserId: student.tuteeUserId,
      presence: studentAttendance[student.tuteeUserId] === "Present",
    }));

    const bodyToSend = {
      lessonSummary,
      tuteesPresence: presenceArray,
    };

    console.log(
      "📦 Sending mentor review payload:",
      JSON.stringify(bodyToSend, null, 2)
    );

    await submitReview(id, bodyToSend);

    showToast({
      message: "Lesson report submitted!",
      type: "success",
    });

    await fetchMentorLessons();
    onClose();
  };


  const isFormValid = () => {
    const allStudentsMarked = students.every(
      (student) => studentAttendance[student.tuteeUserId] !== undefined
    );
    const hasLessonSummary = lessonSummary.trim().length > 0;
    return allStudentsMarked && hasLessonSummary;
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-lg">
          <ScrollView className="w-full">
            <CloseButton onPress={onClose} />

            <View className="w-full items-start mt-6">
              <Text className="text-xl font-bold text-gray-800 mb-3">
                Lesson Review - {subject} – {grade}
              </Text>
              <View className="bg-gray-50 p-4 rounded-xl w-full mb-6">
                <Text className="text-gray-600 mb-1">
                  {day}, {date}
                </Text>
                <Text className="text-gray-600">
                  From {startTime} to {endTime}
                </Text>
              </View>
            </View>

            {/* Student Attendance */}
            <View className="w-full items-start mb-6">
              <Text className="text-lg font-bold text-gray-800 mb-3">
                Student Attendance
              </Text>

              {students.map((student) => (
                <View
                  key={student.tuteeUserId}
                  className="w-full bg-white p-4 rounded-xl border border-gray-100 mb-3"
                >
                  <Text className="text-gray-700 font-medium mb-2">
                    {student.first_name} {student.last_name}
                  </Text>
                  <RadioButtonGroup
                    options={attendanceOptions}
                    selectedValue={studentAttendance[student.tuteeUserId]}
                    onValueChange={(value) =>
                      handleAttendanceChange(student.tuteeUserId, value)
                    }
                  />
                </View>
              ))}
            </View>

            {/* Lesson Summary */}
            <View className="w-full mb-6">
              <Text className="text-lg font-bold text-gray-800 mb-3">
                Lesson Summary
              </Text>
              <View className="w-full bg-white p-4 rounded-xl border border-gray-100">
                <TextInput
                  value={lessonSummary}
                  onChangeText={(text) => setLessonSummary(text.slice(0, 200))} // Limit to 200 characters
                  placeholder="Write lesson summary..."
                  multiline
                  numberOfLines={4}
                  className="text-gray-700"
                  style={{ minHeight: 80, textAlignVertical: "top" }}
                />
                <Text className="text-right text-xs text-gray-400 mt-1">
                  {lessonSummary.length}/200
                </Text>
              </View>
            </View>

            {/* Submit Button */}
            <View className="w-full items-center mb-4">
              <CustomButton
                title="Submit Review"
                handlePress={handleSubmit}
                containerStyles={`w-4/5 ${isFormValid() ? "opacity-100" : "opacity-50"
                  }`}
                disabled={!isFormValid()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
