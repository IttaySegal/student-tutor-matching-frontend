import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";
import { useToast } from "@context/ToastContext";
import {
  subjects,
  grades,
  subjectsWithGroups,
  lessonTypes,
} from "../../constants/lessonOptions";
import { useLesson } from "@context/LessonContext";
import { useAuth } from "@context/AuthContext";

export default function CreateLesson() {
  const { createNewLesson } = useLesson();
  const { showToast } = useToast();
  const { user } = useAuth();
  const availableSubjects = user?.subjects || [];
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

  const groupOptions = subjectsWithGroups[subject] || [];

  const resetForm = () => {
    setSubject("");
    setGrade("");
    setGroup("");
    setDate(new Date());
    setTime(new Date());
    setLessonDescription("");
    setLessonType("");
    setLessonLocation("");
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (time) =>
    time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

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

      await createNewLesson(lessonData);
      showToast({
        message: "Lesson created successfully!",
        subMessage: "Your lesson has been posted successfully",
        type: "success",
      });
      resetForm();
    } catch (err) {
      showToast({
        message: "Error creating lesson",
        subMessage: err.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const sharedStyles = {
    boxStyles: {
      backgroundColor: "#fff",
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputStyles: { textAlign: "left", fontSize: 16 },
    dropdownStyles: { backgroundColor: "#fff" },
    dropdownTextStyles: { textAlign: "left", fontSize: 16 },
    arrowicon: <Ionicons name="chevron-down-outline" size={20} color="gray" />,
  };

  const isFormValid =
    subject &&
    grade &&
    (group || groupOptions.length === 0) &&
    lessonDescription &&
    lessonType &&
    date &&
    time;

  return (
    <ScrollView className="flex-1 bg-primary">
      <View className="px-5 py-6">
        <View className="w-full gap-4 mb-6">
          <SelectList
            setSelected={setSubject}
            // data={subjects.map((s) => ({ key: s.value, value: s.value }))}
            data={availableSubjects.map((s) => ({ key: s, value: s }))}
            placeholder="Select Subject"
            testID="subject-select"
            {...sharedStyles}
          />

          <SelectList
            setSelected={setGrade}
            data={grades}
            placeholder="Select Grade"
            testID="grade-select"
            {...sharedStyles}
          />

          {groupOptions.length > 0 ? (
            <SelectList
              setSelected={setGroup}
              data={groupOptions.map((g) => ({ key: g, value: g }))}
              placeholder="Select Group"
              testID="group-select"
              {...sharedStyles}
            />
          ) : (
            <Text className="text-white text-base mt-1">Group: General</Text>
          )}
        </View>

        <View className="mb-4 mt-4">
          <Text className="text-white text-base mb-2">Lesson Description</Text>
          <View className="bg-white rounded-lg p-3">
            <TextInput
              className="text-gray-800 text-base"
              placeholder="Enter lesson description"
              placeholderTextColor="#9CA3AF"
              value={lessonDescription}
              onChangeText={setLessonDescription}
              testID="description-input"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-white text-base mb-2">Lesson Type</Text>
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
                  className={`$ {
                    lessonType === type.value ? "text-white" : "text-gray-800"
                  }`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-white text-base mb-2">Location</Text>
          <View className="bg-white rounded-lg p-3">
            <TextInput
              className="text-gray-800 text-base"
              placeholder="Enter location"
              placeholderTextColor="#9CA3AF"
              value={lessonLocation}
              testID="location-input"
              onChangeText={setLessonLocation}
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-white text-base mb-2">Date & Time</Text>
          <View className="flex-row flex-wrap">
            <TouchableOpacity
              className="bg-white rounded-lg p-3 mr-3 mb-3 flex-row items-center"
              onPress={() => setShowDatePicker(true)}
            >
              <FontAwesome5
                name="calendar"
                size={16}
                color="#6B7280"
                style={{ marginRight: 8 }}
              />
              <Text className="text-gray-800">{formatDate(date)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-lg p-3 mb-3 flex-row items-center"
              onPress={() => setShowTimePicker(true)}
            >
              <FontAwesome5
                name="clock"
                size={16}
                color="#6B7280"
                style={{ marginRight: 8 }}
              />
              <Text className="text-gray-800">{formatTime(time)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
            maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
            minuteInterval={15}
          />
        )}

        <CustomButton
          title="Create Lesson"
          handlePress={handleCreateLesson}
          containerStyles="mt-4 w-full"
          disabled={!isFormValid}
          testID="create-button"
        />
      </View>
    </ScrollView>
  );
}
