import React, { useState } from "react";
import { View, Modal, ScrollView, TouchableOpacity } from "react-native";
import RTLText from "./RTLText";
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
  
  // Options for lesson descriptions in Hebrew
  const lessonDescriptionOptions = [
    { label: "התלמידים הבינו את החומר", value: "התלמידים הבינו את החומר" },
    { label: "השיעור היה מעניין", value: "השיעור היה מעניין" },
    { label: "התלמידים השתתפו פעיל", value: "התלמידים השתתפו פעיל" },
    { label: "היה צורך בהסברים נוספים", value: "היה צורך בהסברים נוספים" },
    { label: "החומר היה קשה מדי", value: "החומר היה קשה מדי" },
    { label: "החומר היה קל מדי", value: "החומר היה קל מדי" },
    { label: "היה צורך בהתאמה אישית", value: "היה צורך בהתאמה אישית" },
  ];
  
  // Attendance options in Hebrew
  const attendanceOptions = [
    { label: "הגיע", value: "הגיע" },
    { label: "לא הגיע", value: "לא הגיע" },
    { label: "איחר", value: "איחר" },
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
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center" style={{ direction: "rtl" }}>
        <View
          className="bg-white rounded-2xl p-6 w-11/12 max-w-md"
          style={{ direction: "rtl", alignItems: "flex-start" }}
        >
          <ScrollView className="w-full" contentContainerStyle={{ direction: "rtl", alignItems: "flex-start" }}>
            {/* כפתור סגירה */}
            <CloseButton onPress={onClose} />
            
            <View style={{ direction: "rtl", width: "100%", alignItems: "flex-start" }}>
              <RTLText style={{ fontSize: 18, fontWeight: "bold", marginTop: 40 }}>
                סקירת שיעור ב{subject} – {grade}
              </RTLText>
              <RTLText>
                {day}, {date}
              </RTLText>
              <RTLText>
                משעה {startTime} עד {endTime}
              </RTLText>
            </View>
            
            {/* נוכחות תלמידים */}
            <View style={{ direction: "rtl", marginTop: 20, width: "100%", alignItems: "flex-start" }}>
              <RTLText style={{ fontWeight: "bold" }}>
                נוכחות תלמידים:
              </RTLText>
              
              {students.map((student) => (
                <View key={student._id} className="mb-4" style={{ direction: "rtl", width: "100%", alignItems: "flex-start" }}>
                  <RTLText style={{ marginBottom: 5 }}>
                    {student.first_name} {student.last_name}:
                  </RTLText>
                  <RadioButtonGroup
                    options={attendanceOptions}
                    selectedValue={studentAttendance[student._id]}
                    onValueChange={(value) => handleAttendanceChange(student._id, value)}
                  />
                </View>
              ))}
            </View>
            
            {/* דירוג השיעור */}
            <View style={{ direction: "rtl", marginTop: 20, width: "100%", alignItems: "flex-start" }}>
              <RTLText style={{ fontWeight: "bold" }}>
                דירוג השיעור:
              </RTLText>
              <View style={{ 
                flexDirection: "row", 
                justifyContent: "flex-end", 
                width: "100%", 
                marginVertical: 16,
                gap: 8
              }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleRatingChange(star)}
                  >
                    <RTLText style={{ fontSize: 30, color: star <= rating ? "#FFD700" : "#D3D3D3" }}>
                      ★
                    </RTLText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* תיאור השיעור */}
            <View style={{ marginTop: 20, width: "100%" }}>
              <RTLText style={{ fontWeight: "bold", marginBottom: 10 }}>
                תיאור השיעור:
              </RTLText>
              <SelectField
                label="בחר תיאורים המתאימים לשיעור:"
                selectedValue={selectedDescriptions}
                onValueChange={handleDescriptionChange}
                options={lessonDescriptionOptions}
                multiple={true}
              />
            </View>
            
            {/* כפתור שליחה */}
            <View className="w-full mt-8 items-center" style={{ direction: "rtl", alignItems: "center" }}>
              <CustomButton
                title="שלח סקירה"
                handlePress={handleSubmit}
                containerStyles={`w-4/5 ${isFormValid() ? "" : ""}`}
                disabled={!isFormValid()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
