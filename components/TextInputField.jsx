import React from "react";
import { View, Text, TextInput } from "react-native";

const TextInputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  ...rest
}) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 16, marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{
          borderWidth: 1.5,
          borderColor: error ? "red" : "#d1d5db", // red border when error
          borderRadius: 8,
          padding: 12,
          backgroundColor: "#fff",
        }}
        {...rest}
      />
      {error && (
        <Text style={{ color: "red", fontSize: 13, marginTop: 4 }}>{error}</Text>
      )}
    </View>
  );
};

export default TextInputField;
