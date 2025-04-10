import { View, Modal, Text } from "react-native";
import CustomButton from "./CustomButton";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LessonEditModal from "./LessonEditModal";
import CloseButton from "../components/CloseButton";

export default function LessonDetailsModal({
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
}) {
  const { user } = useAuth();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const isStudent = user?.role === "student";
  const isMentor = user?.role === "mentor";

  const handleManageLesson = () => {
    setIsEditModalVisible(true);
  };

  const isStudentRegistered =
    isStudent && students.some((student) => student._id === user?._id);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
        <View
          className="bg-white rounded-2xl p-6 w-11/12 max-w-md"
          style={{ alignItems: "flex-start" }}
        >
          <CloseButton onPress={onClose} />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {subject} Lesson – Grade {grade}
          </Text>
          <Text>
            {day}, {date}
          </Text>
          <Text>
            From {startTime} to {endTime}
          </Text>
          <Text>
            {isMentor ? "Mentor" : "Mentor"}: {mentor}
          </Text>

          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Lesson Description:
          </Text>
          <Text>{description}</Text>

          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Registered Students:
          </Text>
          {students.length === 0 ? (
            <Text>No students registered yet.</Text>
          ) : (
            students.map((student, i) => (
              <Text key={i}>
                • {student.first_name} {student.last_name}
              </Text>
            ))
          )}

          <View className="w-full mt-8 items-center">
            {isStudent ? (
              isStudentRegistered ? (
                <CustomButton
                  title="Cancel Registration"
                  handlePress={() => console.log("Cancel registration")}
                  containerStyles="w-4/5 bg-red-500"
                />
              ) : students.length >= 3 ? (
                <Text>Lesson is full</Text>
              ) : (
                <CustomButton
                  title="Register for Lesson"
                  handlePress={() => console.log("Register for lesson")}
                  containerStyles="w-4/5"
                />
              )
            ) : isMentor ? (
              <CustomButton
                title="Manage Lesson"
                handlePress={handleManageLesson}
                containerStyles="w-4/5"
              />
            ) : (
              <CustomButton
                title="Action Not Available"
                handlePress={() => console.log("Action not available")}
                containerStyles="w-4/5 bg-gray-500"
              />
            )}
          </View>
        </View>
      </View>
      {isEditModalVisible && (
        <LessonEditModal
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
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
          onSaveChanges={(newDescription, newLocation) => {
          }}
          onDeleteLesson={() => {
          }}
        />
      )}
    </Modal>
  );
}
