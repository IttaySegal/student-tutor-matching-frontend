// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { useAuth } from "@/context/AuthContext";
// import RegisterLesson from "@/app/create/RegisterLesson";
// import CreateLesson from "@/app/create/CreateLesson";

// export default function CreateScreen() {
//   const { user } = useAuth();

//   return (
//     <View className="flex-1 bg-primary px-5 py-6">
//       <Text className="text-2xl font-bold text-white mb-6 text-center">
//         {user?.role === "mentor" ? "Create Lesson" : "Register for Lesson"}
//       </Text>
//       {user?.role === "mentor" ? <CreateLesson /> : <RegisterLesson />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({});


import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import RegisterLesson from "@/app/create/RegisterLesson";
import CreateLesson from "@/app/create/CreateLesson";
import AdminActions from "@/app/create/AdminActions";

export default function CreateScreen() {
  const { user } = useAuth();

  let content = null;
  let title = "Create";

  switch (user?.role) {
    case "mentor":
      title = "Create Lesson";
      content = <CreateLesson />;
      break;
    case "student":
      title = "Register for Lesson";
      content = <RegisterLesson />;
      break;
    case "admin":
      title = "Admin Actions";
      content = <AdminActions />;
      break;
    default:
      title = "Unauthorized";
      content = <Text className="text-white text-center">Role not recognized</Text>;
  }

  return (
    <View className="flex-1 bg-primary px-5 py-6">
      <Text className="text-2xl font-bold text-white mb-6 text-center">
        {title}
      </Text>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({});