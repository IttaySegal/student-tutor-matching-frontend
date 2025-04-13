import React, { useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import SelectField from "../../components/SelectField";
import {
  subjects,
  grades,
  subjectsWithGroups,
  lessonTypes,
} from "../../constants/lessonOptions";
import { useLesson } from "@context/LessonContext"; 

export default function CreateLesson() {
  const { createNewLesson } = useLesson(); 
  
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [group, setGroup] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonType, setLessonType] = useState("");
  const [lessonLocation, setLessonLocation] = useState("");

  // Get group options based on selected subject
  const groupOptions = subjectsWithGroups[subject] || [];

  // Handle date change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Handle time change
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format time for display
  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleCreateLesson = async () => {
    try {
      const lessonData = {
        subject,
        grade,
        group: group || "General",
        date: date.toISOString().split("T")[0],
        time: time.toTimeString().split(" ")[0],
        description: lessonDescription,
        type: lessonType,
        location: lessonLocation,
      };

      console.log("📦 Sending new lesson data:", lessonData);
      await createNewLesson(lessonData);

      Toast.show({
        type: "success",
        text1: "Lesson created successfully!",
        position: "bottom",
      });
      } catch (err) {
      console.error("❌ Failed to create lesson:", err);
      Toast.show({
        type: "error",
        text1: "Error creating lesson",
        text2: err.message || "Something went wrong",
        position: "bottom",
      });
    }
  };


  return (
    <ScrollView className="flex-1 bg-primary">
      <View className="px-5 py-6">
        <Text className="text-white font-bold text-lg mb-4">
          Create New Lesson
        </Text>

        {/* Subject Selection */}
        <SelectField
          label="📚 Subject"
          selectedValue={subject}
          onValueChange={setSubject}
          options={subjects.map((s) => ({ key: s.value, value: s.value }))}
        />

        {/* Grade Selection */}
        <SelectField
          label="🎓 Grade"
          selectedValue={grade}
          onValueChange={setGrade}
          options={grades}
        />

        {/* Group Selection (if applicable) */}
        {groupOptions.length > 0 ? (
          <SelectField
            label="🧑‍🏫 Group"
            selectedValue={group}
            onValueChange={setGroup}
            options={groupOptions.map((g) => ({ key: g, value: g }))}
          />
        ) : (
          <Text className="text-white text-base mb-4">
            Group: General
          </Text>
        )}

        {/* Lesson Description */}
        <View className="mb-4">
          <Text className="text-white text-base mb-2">📝 Lesson Description</Text>
          <View className="bg-white rounded-lg p-3">
            <TextInput
              className="text-gray-800 text-base"
              placeholder="Enter lesson description"
              placeholderTextColor="#9CA3AF"
              value={lessonDescription}
              onChangeText={setLessonDescription}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Lesson Type */}
        <View className="mb-4">
          <Text className="text-white text-base mb-2">💻 Lesson Type</Text>
          <View className="flex-row flex-wrap">
            {lessonTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                className={`mr-3 mb-3 px-4 py-2 rounded-full border ${
                  lessonType === type.value
                    ? "bg-blue-500 border-blue-600"
                    : "bg-white border-gray-300"
                }`}
                onPress={() => setLessonType(type.value)}
              >
                <Text
                  className={`${
                    lessonType === type.value ? "text-white" : "text-gray-800"
                  }`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Lesson Location */}
        <View className="mb-4">
          <Text className="text-white text-base mb-2">📍 Location</Text>
          <View className="bg-white rounded-lg p-3">
            <TextInput
              className="text-gray-800 text-base"
              placeholder="Enter location"
              placeholderTextColor="#9CA3AF"
              value={lessonLocation}
              onChangeText={setLessonLocation}
            />
          </View>
        </View>

        {/* Date and Time Selection */}
        <View className="mb-4">
          <Text className="text-white text-base mb-2">🕒 Date & Time</Text>
          <View className="flex-row flex-wrap">
            <TouchableOpacity
              className="bg-white rounded-lg p-3 mr-3 mb-3 flex-row items-center"
              onPress={() => setShowDatePicker(true)}
            >
              <FontAwesome5 name="calendar" size={16} color="#6B7280" style={{ marginRight: 8 }} />
              <Text className="text-gray-800">{formatDate(date)}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-white rounded-lg p-3 mb-3 flex-row items-center"
              onPress={() => setShowTimePicker(true)}
            >
              <FontAwesome5 name="clock" size={16} color="#6B7280" style={{ marginRight: 8 }} />
              <Text className="text-gray-800">{formatTime(time)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
            maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} // 1 week from now
          />
        )}

        {/* Time Picker Modal */}
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
            minuteInterval={15}
          />
        )}

        {/* Create Lesson Button */}
        <CustomButton
          title="Create Lesson"
          handlePress={handleCreateLesson}
          containerStyles="mt-4 w-full"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  selectBox: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectInput: {
    color: "#F9FAFB",
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
  },
  dropdownText: {
    color: "#F9FAFB",
    fontSize: 16,
  },
  searchInput: {
    color: "#F9FAFB",
    fontSize: 16,
  },
});
