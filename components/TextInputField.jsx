import React from "react";
import { View, Text, TextInput } from "react-native";

// Generic component for text input fields
const TextInputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  style,
}) => {
  return (
    <View style={{ marginBottom: 20, width: "100%", ...style }}>
      {/* Label text */}
      <Text
        style={{
          marginBottom: 5,
          fontSize: 16,
          fontWeight: "500",
          color: "#374151",
        }}
      >
        {label}
      </Text>
      {/* Text input field */}
      <TextInput
        style={{
          height: multiline ? 100 : 40,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          textAlign: "left",
          writingDirection: "ltr",
          direction: "ltr",
          padding: 10,
          backgroundColor: "#fff",
        }}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextInputField;
