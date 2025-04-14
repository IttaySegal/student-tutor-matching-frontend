import React, { useState, useEffect } from "react";
import { View, Modal, Text } from "react-native";
import CustomButton from "./CustomButton";
import TextInputField from "./TextInputField";
import { useAuth } from "../context/AuthContext";
import CloseButton from "./CloseButton";

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
  const [localDescription, setLocalDescription] = useState(description || "");
  const [localLocation, setLocalLocation] = useState(lessonLocation || "");

  const { user } = useAuth();

  useEffect(() => {
    setLocalDescription(description);
    setLocalLocation(lessonLocation);
  }, [description, lessonLocation]);

  const handleSave = () => {
    onSaveChanges(localDescription, localLocation);
    onClose();
  };

  const handleDescriptionChange = (text) => {
    setLocalDescription(text);
  };

  const handleDelete = () => {
    onDeleteLesson();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-lg">
          <CloseButton onPress={onClose} />
          
          <View className="w-full items-start mt-6">
            <Text className="text-xl font-bold text-gray-800 mb-3">
              Edit Lesson - {subject} – {grade}
            </Text>
            <View className="bg-gray-50 p-4 rounded-xl w-full mb-6">
              <Text className="text-gray-600 mb-1">
                {day}, {date}
              </Text>
              <Text className="text-gray-600">
                From {startTime} to {endTime}
              </Text>
              <Text className="text-gray-600 mt-1">
                Mentor: {mentor}
              </Text>
            </View>
          </View>
          
          <TextInputField
            label="Lesson Description"
            value={localDescription}
            onChangeText={handleDescriptionChange}
            placeholder="Enter lesson description"
            multiline={true}
          />
          
          <TextInputField
            label="Lesson Location"
            value={localLocation}
            onChangeText={setLocalLocation}
            placeholder="Enter location or Zoom link"
          />
          
          <View className="w-full items-center mt-6">
            <CustomButton
              title="Save Changes"
              handlePress={handleSave}
              containerStyles="w-4/5 mb-4"
            />
            
            <CustomButton
              title="Cancel Lesson"
              handlePress={handleDelete}
              containerStyles="w-4/5 bg-red-500"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
