// // Import necessary modules and components from libraries
// import { StatusBar } from "expo-status-bar"; // Provides a customizable status bar for the app
// import { Image, ScrollView, Text, View } from "react-native"; // Core React Native components for layout and styling
// import { Link } from "expo-router"; // Used for navigation between pages in the app
// import { Redirect, router } from "expo-router"; // Router utilities for navigation
// import { SafeAreaView } from "react-native-safe-area-context"; // Ensures content stays within safe area boundaries
// import { images } from "../constants"; // Imports images from a central constants file
// import CustomButton from "../components/CustomButton"; // Custom reusable button component
// import { useAuth } from "../context/AuthContext";
// import { useEffect } from "react";
// import { useFocusEffect } from "@react-navigation/native";
// import { useCallback } from "react";

// // Main App component definition
// const Welcome = () => {
//   console.log("Inside Welcome before: useAuth");
//   const { isAuthenticated, loading } = useAuth();
//   console.log("isAuth: ", isAuthenticated);
//   console.log("isLoad: ", loading);
//   console.log("Inside Welcome after: useAuth");

//   useFocusEffect(
//     useCallback(() => {
//       if (!loading && isAuthenticated) {
//         router.replace("/(tabs)/home");
//       }
//     }, [loading, isAuthenticated])
//   );

//   return (
//     // {/* // Wrapper ensuring content is within safe area and styled with a primary background color */}
//     <SafeAreaView className="bg-primary h-full">
//       {/* ScrollView to enable scrolling if content overflows, with full height styling */}
//       <ScrollView contentContainerStyle={{ height: "100%" }}>
//         <View className="w-full justify-center items-center min-h-[85vh] px-4">
//           {/* Logo image */}
//           <Image
//             source={images.newLogoBig} // Path to logo image
//             className="w-[136px] h-[80px]" // Styling for image dimensions
//             resizeMode="contain" // Ensures the image fits within its container
//           />
//           {/* Main cards image */}
//           <Image
//             source={images.newCards} // Path to cards image
//             className="max-w--[380px] w-full h-[300px]" // Styling for responsive width and fixed height
//             resizeMode="contain" // Ensures image maintains aspect ratio
//           />
//           {/* Text section with a decorative image */}
//           <View className="relative mt-5">
//             <Text className="text-3xl text-white font-bold text-center">
//               Discover Endless{"\n"}
//               Possibilities with{" "}
//               <Text className="text-secondary-200">Tutor</Text>
//             </Text>
//             {/* Decorative path image */}
//             <Image
//               source={images.path} // Path to the decorative image
//               className="w-[136px] h-[15px] absolute -bottom-2 -right-8" // Styling for positioning and dimensions
//               resizeMode="contain" // Ensures image fits within defined dimensions
//             />
//           </View>
//           {/* Subtitle text */}
//           <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
//             Empower Your Learning Journey: Where Knowledge Meets Guidance and
//             Innovation for Personalized Learning and Academic Excellence with
//             Tutor
//           </Text>
//           {/* Button for navigation */}
//           <CustomButton
//             title="Continue with Email" // Button text
//             handlePress={() => router.push("/(auth)/sign-in")} // Navigation to sign-in page on press
//             containerStyles="w-full mt-7" // Styling for button container
//           />
//           <CustomButton
//             title="TabsForCheck" // Button text
//             //handlePress={() => router.replace('/(tabs)/home')} // Navigation to sign-in page on press
//             handlePress={() => router.push("/(profile)/profile")}
//             containerStyles="w-full mt-7" // Styling for button container
//           />
//         </View>
//       </ScrollView>
//       {/* Status bar with custom background and light style */}
//       <StatusBar backgroundColor="#161622" style="light" />
//     </SafeAreaView>
//   );
// };
// export default Welcome;

//----------------------------------------------------/
// import TestCard from "./test-card";

// export default function Index() {
//   return <TestCard />;
// }
//----------------------------------------------------/
// import { View, ScrollView, Text } from "react-native";
// import SearchBar from "../components/SearchBar";

// const Index = () => {
//   const handleSearch = ({ subject, grade, group }) => {
//     console.log("🔍 חיפוש שבוצע:");
//     console.log("מקצוע:", subject);
//     console.log("כיתה:", grade);
//     console.log("הקבצה:", group);
//   };

//   return (
//     <ScrollView className="flex-1 bg-primary px-4 pt-10">
//       <SearchBar onSearch={handleSearch} />
//     </ScrollView>
//   );
// };

// export default Index;

//----------------------------------------------------/

// import SearchLessonsScreen from "./SearchLessonsScreen";

// export default function Index() {
//   return <SearchLessonsScreen />;
// }
//----------------------------------------------------/

// import React, { useState } from "react";
// import { View, Text } from "react-native";
// import DateSelector from "../components/DateSelector"; // שים לב לנתיב הנכון

// export default function Index() {
//   const [date, setDate] = useState(new Date()); // אם צריך, תעדכן את הסטייט של התאריך
//   return (
//     <View>
//       <DateSelector date={date} setDate={setDate} />
//     </View>
//   );
// }
//----------------------------------------------------/
// import React, { useState } from "react";
// import { View, Text } from "react-native";
// import TimeSelector from "../components/TimeSelector"; // נתיב לקומפוננטה

// export default function Index() {
//   const [time, setTime] = useState(new Date()); // הסטייט שמחזיק את הזמן שנבחר

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
//         בחר שעה (בין 8:00 ל־18:00):
//       </Text>
//       <TimeSelector time={time} setTime={setTime} /> {/* השימוש בקומפוננטה */}
//       {/* הצגת הזמן שנבחר */}
//       {time && (
//         <Text style={{ marginTop: 20 }}>
//           השעה הנבחרת: {time.getHours()}:
//           {time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}
//         </Text>
//       )}
//     </View>
//   );
// }
//----------------------------------------------------/
// import React from "react";
// import { View } from "react-native";
// import CreateLesson from "./(tabs)/CreateLesson"; // נתיב לקומפוננטת יצירת שיעור

// export default function Index() {
//   return (
//     <View style={{ flex: 1 }}>
//       <CreateLesson /> {/* הצגת הקומפוננטה של יצירת שיעור */}
//     </View>
//   );
// }
//----------------------------------------------------/
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import CreateLesson from "./(tabs)/CreateLesson";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <CreateLesson /> {/* הצגת דף TestPage */}
    </SafeAreaView>
  );
}

//----------------------------------------------------/
