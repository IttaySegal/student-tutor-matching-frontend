import React, { useState } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Text } from "react-native";
import CustomButton from "./CustomButton";
import CloseButton from "./CloseButton";
import RadioButtonGroup from "./RadioButtonGroup";
import SelectField from "./SelectField";

export default function LessonReviewMentor({
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
  onSubmit,
  ...props
}) {
  // State for student attendance
  const [studentAttendance, setStudentAttendance] = useState({});
  
  // State for lesson rating (1-5 stars)
  const [rating, setRating] = useState(0);
  
  // State for selected lesson descriptions
  const [selectedDescriptions, setSelectedDescriptions] = useState([]);
  
  // Options for lesson descriptions
  const lessonDescriptionOptions = [
    { label: "Students understood the material", value: "Students understood the material" },
    { label: "The lesson was interesting", value: "The lesson was interesting" },
    { label: "Students actively participated", value: "Students actively participated" },
    { label: "Additional explanations were needed", value: "Additional explanations were needed" },
    { label: "The material was too difficult", value: "The material was too difficult" },
    { label: "The material was too easy", value: "The material was too easy" },
    { label: "Individual adaptation was needed", value: "Individual adaptation was needed" },
  ];
  
  // Attendance options
  const attendanceOptions = [
    { label: "Present", value: "Present" },
    { label: "Absent", value: "Absent" },
    { label: "Late", value: "Late" },
  ];
  
  // Handle student attendance change
  const handleAttendanceChange = (studentId, value) => {
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: value
    }));
  };
  
  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };
  
  // Handle description selection change
  const handleDescriptionChange = (value) => {
    setSelectedDescriptions(value);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        studentAttendance,
        rating,
        selectedDescriptions
      });
    }
    onClose();
  };
  
  // Check if form is valid
  const isFormValid = () => {
    // Check if all students have attendance marked
    const allStudentsMarked = students.every(student => 
      studentAttendance[student._id] !== undefined
    );
    
    // Check if rating is selected
    const ratingSelected = rating > 0;
    
    // Check if at least one description is selected
    const descriptionsSelected = selectedDescriptions.length > 0;
    
    return allStudentsMarked && ratingSelected && descriptionsSelected;
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
            
            {/* Student attendance */}
            <View className="w-full items-start mb-6">
              <Text className="text-lg font-bold text-gray-800 mb-3">
                Student Attendance
              </Text>
              
              {students.map((student) => (
                <View key={student._id} className="w-full bg-white p-4 rounded-xl border border-gray-100 mb-3">
                  <Text className="text-gray-700 font-medium mb-2">
                    {student.first_name} {student.last_name}
                  </Text>
                  <RadioButtonGroup
                    options={attendanceOptions}
                    selectedValue={studentAttendance[student._id]}
                    onValueChange={(value) => handleAttendanceChange(student._id, value)}
                  />
                </View>
              ))}
            </View>
            
            {/* Lesson rating */}
            <View className="w-full items-start mb-6">
              <Text className="text-lg font-bold text-gray-800 mb-3">
                Lesson Rating
              </Text>
              <View className="w-full bg-white p-4 rounded-xl border border-gray-100">
                <View className="flex-row justify-center gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleRatingChange(star)}
                    >
                      <Text className="text-3xl" style={{ color: star <= rating ? "#FFD700" : "#E5E7EB" }}>
                        ★
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            
            {/* Lesson description */}
            <View className="w-full mb-6">
              <Text className="text-lg font-bold text-gray-800 mb-3">
                Lesson Description
              </Text>
              <View className="w-full bg-white p-4 rounded-xl border border-gray-100">
                <SelectField
                  label="Select descriptions that match the lesson:"
                  selectedValue={selectedDescriptions}
                  onValueChange={handleDescriptionChange}
                  options={lessonDescriptionOptions}
                  multiple={true}
                />
              </View>
            </View>
            
            {/* Submit button */}
            <View className="w-full items-center mb-4">
              <CustomButton
                title="Submit Review"
                handlePress={handleSubmit}
                containerStyles={`w-4/5 ${isFormValid() ? "opacity-100" : "opacity-50"}`}
                disabled={!isFormValid()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
