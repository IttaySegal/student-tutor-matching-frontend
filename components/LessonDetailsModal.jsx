import { View, Modal, Text } from "react-native";
import CustomButton from "./CustomButton";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LessonEditModal from "./LessonEditModal";
import CloseButton from "../components/CloseButton";
import { useLesson } from "@context/LessonContext";
import { useToast } from "@context/ToastContext";
import * as Clipboard from "expo-clipboard";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function LessonDetailsModal({
  visible,
  onClose,
  id,
  subject,
  grade,
  date,
  day,
  startTime,
  endTime,
  mentor,
  description,
  students = [],
  format,
  lessonLocation,
  isMyLessons = false,
  onUnregisterSuccess,
  onRegisterSuccess,
}) {
  const { user } = useAuth();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const isStudent = user?.role === "student";
  const isMentor = user?.role === "mentor";
  const {
    registerLesson,
    unregisterLesson,
    updateLesson,
    deleteLesson,
    fetchMentorLessons,
  } = useLesson();
  const { showToast } = useToast();
  console.log("🔍 Students array in modal:", students);

  const handleRegister = async () => {
    try {
      await registerLesson(id);
      showToast({
        message: "Register to lesson successfully!",
        type: "success",
      });
      onRegisterSuccess?.();
      onClose();
    } catch (error) {
      showToast({
        message: "Registration Failed",
        subMessage: error.message || "Failed to register for the lesson",
        type: "error",
      });
    }
  };

  const handleUnregister = async () => {
    try {
      await unregisterLesson(id);
      showToast({
        message: "You unRegister to lesson successfully",
        type: "success",
      });
      onClose();
      if (onUnregisterSuccess) {
        onUnregisterSuccess(id);
      }
    } catch (error) {
      showToast({
        message: "Registration Failed",
        subMessage: error.message || "Failed to register for the lesson",
        type: "erro r",
      });
    }
  };

  const handleSaveChanges = async (newDescription, newLocation) => {
    try {
      console.log("🔍 BEFORE updateLesson:");
      console.log("newDescription:", newDescription);
      console.log("newLocation:", newLocation);
      await updateLesson(id, newDescription, newLocation);
      showToast({
        message: "Lesson updated successfully!",
        type: "success",
      });

      setIsEditModalVisible(false);
      onClose();
    } catch (error) {
      console.error("Error updating lesson:", error);
      showToast({
        message: "Failed to update lesson.",
        subMessage: error.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const handleDeleteLesson = async () => {
    await deleteLesson(id);
    setIsEditModalVisible(false);
    onClose();
  };

  const handleManageLesson = () => {
    setIsEditModalVisible(true);
  };

  const isStudentRegistered =
    isStudent &&
    (isMyLessons || students.some((student) => student._id === user?._id));

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
            Lesson Format:
          </Text>
          <Text>
            {format === "online" ? "Online Lesson" : "In-person Lesson"}
          </Text>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Lesson Location:
          </Text>
          {lessonLocation ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Text selectable style={{ color: "blue", flexShrink: 1 }}>
                {lessonLocation}
              </Text>
              {format === "online" && (
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setStringAsync(lessonLocation);
                    showToast?.({
                      message: "Link copied to clipboard!",
                      type: "success",
                    });
                  }}
                  style={{
                    marginLeft: 10,
                    backgroundColor: "#e0e0e0",
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Feather name="copy" size={16} color="#333" />
                  <Text
                    style={{ marginLeft: 6, color: "#333", fontWeight: "500" }}
                  >
                    Copy
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <Text>
              {format === "online"
                ? "A link will be shared soon"
                : "Location will be provided soon"}
            </Text>
          )}
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
                • {student.tuteeFullName || "Unknown Student"}
              </Text>
            ))
          )}
          <View className="w-full mt-8 items-center">
            {isStudent ? (
              isStudentRegistered ? (
                <CustomButton
                  title="Cancel Registration"
                  handlePress={handleUnregister}
                  containerStyles="w-4/5 bg-red-500"
                />
              ) : !isMyLessons && students.length >= 3 ? (
                <Text>Lesson is full</Text>
              ) : !isMyLessons ? (
                <CustomButton
                  title="Register for Lesson"
                  handlePress={handleRegister}
                  containerStyles="w-4/5"
                />
              ) : null
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
          id={id}
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
          onSaveChanges={handleSaveChanges}
          onDeleteLesson={handleDeleteLesson}
        />
      )}
    </Modal>
  );
}
