import React from "react";
import { View, TextInput, Text } from "react-native";

const LessonInputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
}) => (
  <View style={{ marginBottom: 20 }}>
    <Text>{label}</Text>
    <TextInput
      style={{
        height: multiline ? 80 : 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        textAlignVertical: multiline ? "top" : "center",
      }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
    />
  </View>
);

export default LessonInputField;
