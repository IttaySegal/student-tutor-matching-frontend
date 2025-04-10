// // Import necessary components from React Native
// import { useState } from "react"; // useState hook for managing the visibility of the password field
// import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"; // Basic components to build the form field UI
// import { icons } from "../constants"; // Icons used for the password visibility toggle

// // Define the FormField component
// const FormField = ({
//   title, // The title or label for the input field (e.g., "Email", "Password")
//   value, // The current value of the input field
//   placeholder, // Placeholder text to show when the field is empty
//   handleChangeText, // Function to handle changes in the input field
//   error, // Validation error message to display (if any)
//   otherStyles, // Additional custom styles for the input container
//   ...props // Spread any other props to be passed to the TextInput component
// }) => {
//   // State to toggle password visibility (for "Password" fields only)
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <View className={`space-y-2 ${otherStyles}`}>
//       {/* Field Title: Display the title above the input field */}
//       <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

//       {/* Input container with styling */}
//       {/* <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center"> */}
//       <View
//         className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 ${error ? "border-red-500" : "border-black-200"
//           } flex flex-row items-center`}
//       >
//         {/* TextInput component for user input */}
//         <TextInput
//           className="flex-1 text-white font-psemibold text-base" // Input field styling
//           value={value} // Controlled input value
//           placeholder={placeholder} // Placeholder text when the input is empty
//           placeholderTextColor="#7B7B8B" // Color of the placeholder text
//           onChangeText={handleChangeText} // Handler for text change
//           secureTextEntry={title === "Password" && !showPassword} // Condition to hide/show password text
//           {...props} // Spread the rest of the props to the TextInput component (e.g., keyboardType, etc.)
//         />

//         {/* Password visibility toggle for "Password" field */}
//         {title === "Password" && (
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             {/* Eye icon to toggle password visibility */}
//             <Image
//               source={!showPassword ? icons.eye : icons.eyeHide} // Show "eye" icon or "eye-hide" based on visibility
//               className="w-6 h-6" // Size of the icon
//               resizeMode="contain" // Ensure the icon fits within the available space
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//       {/* Error Message */}
//       {error && (
//         <Text className="text-red-500 text-sm mt-1">{error}</Text>
//       )}
//     </View>
//   );
// };
//---------------------------------------------------------------------------------
// // Export the FormField component for use in other parts of the application
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
