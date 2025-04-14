import React, { useState } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Text } from "react-native";
import CustomButton from "./CustomButton";
import CloseButton from "./CloseButton";
import SelectField from "./SelectField";

export default function LessonReviewStudent({
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
  onSubmit,
  ...props
}) {
  // State for lesson rating (1-5 stars)
  const [rating, setRating] = useState(0);
  
  // State for selected lesson descriptions
  const [selectedDescriptions, setSelectedDescriptions] = useState([]);
  
  // Options for lesson descriptions
  const lessonDescriptionOptions = [
    { label: "I understood the material", value: "I understood the material" },
    { label: "The lesson was interesting", value: "The lesson was interesting" },
    { label: "I actively participated in the lesson", value: "I actively participated in the lesson" },
    { label: "Additional explanations were needed", value: "Additional explanations were needed" },
    { label: "The material was too difficult", value: "The material was too difficult" },
    { label: "The material was too easy", value: "The material was too easy" },
    { label: "Individual adaptation was needed", value: "Individual adaptation was needed" },
  ];
  
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
        rating,
        selectedDescriptions
      });
    }
    onClose();
  };
  
  // Check if form is valid
  const isFormValid = () => {
    // Check if rating is selected
    const ratingSelected = rating > 0;
    
    // Check if at least one description is selected
    const descriptionsSelected = selectedDescriptions.length > 0;
    
    return ratingSelected && descriptionsSelected;
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
                <Text className="text-gray-600 mb-1">
                  From {startTime} to {endTime}
                </Text>
                <Text className="text-gray-600">
                  Mentor: {mentor}
                </Text>
              </View>
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