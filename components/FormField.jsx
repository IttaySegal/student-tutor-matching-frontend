// export default FormField;
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import icons from "../constants/icons";
console.log(icons.eye); // הדפסת האייקון
console.log(icons.eyeHide); // הדפסת האייקון

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  error,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {/* Field Title: Display the title above the input field */}
      <Text
        className="text-base text-gray-100 font-pmedium"
        style={{ textAlign: "left" }}
      >
        {title}
      </Text>

      {/* Input container with styling */}
      <View
        className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 ${
          error ? "border-red-500" : "border-black-200"
        } flex flex-row items-center`}
      >
        {/* TextInput component for user input */}
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          testID={
            title === "Email"
              ? "email-input"
              : title === "Password"
              ? "password-input"
              : undefined
          }
          {...props}
          style={{ textAlign: "left" }}
        />

        {/* Password visibility toggle for "Password" field */}
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {/* Eye icon to toggle password visibility */}
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text
          className="text-red-500 text-sm mt-1"
          style={{ textAlign: "left" }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default FormField;
