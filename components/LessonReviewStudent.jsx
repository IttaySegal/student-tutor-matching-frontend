import React, { useState } from "react";
import { View, Modal, ScrollView, Text } from "react-native";
import CustomButton from "./CustomButton";
import CloseButton from "./CloseButton";
import StarRatingQuestion from "./StarRatingQuestion";

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
  onSubmit,
  ...props
}) {
  const [clarity, setClarity] = useState(0);
  const [understanding, setUnderstanding] = useState(0);
  const [focus, setFocus] = useState(0);
  const [helpful, setHelpful] = useState(0);

  const isFormValid = () => {
    return clarity > 0 && understanding > 0 && focus > 0 && helpful > 0;
  };

  const handleSubmit = () => {
    if (onSubmit && isFormValid()) {
      onSubmit({
        clarity,
        understanding,
        focus,
        helpful,
        lessonId: props.id,
      });
    }
    onClose();
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
                <Text className="text-gray-600">Mentor: {mentor}</Text>
              </View>
            </View>

            <StarRatingQuestion
              title="⭐ 1. Clarity"
              question="How clear were the tutor's explanations?"
              value={clarity}
              setValue={setClarity}
            />
            <StarRatingQuestion
              title="⭐ 2. Understanding"
              question="Did this lesson improve your understanding of the topic?"
              value={understanding}
              setValue={setUnderstanding}
            />
            <StarRatingQuestion
              title="⭐ 3. Focus"
              question="How focused was the tutor on teaching and answering your questions during the lesson?"
              value={focus}
              setValue={setFocus}
            />
            <StarRatingQuestion
              title="⭐ 4. Helpful"
              question="Did the tutor help you overcome difficulties or confusion?"
              value={helpful}
              setValue={setHelpful}
            />

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
