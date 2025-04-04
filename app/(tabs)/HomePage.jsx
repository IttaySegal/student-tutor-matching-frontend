import React from "react";
import { View, StyleSheet } from "react-native";
import StudentHome from "./StudentHome"; // הקומפוננטה לחניך
import MentorHome from "./MentorHome"; // הקומפוננטה לחונך

const HomePage = ({ userRole, userName }) => {
  return (
    <View style={styles.container}>
      {userRole === "student" && <StudentHome userName={userName} />}
      {userRole === "mentor" && <MentorHome userName={userName} />}
      {userRole === "admin" && <AdminHome userName={userName} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0", // צבע רקע כללי
  },
});

export default HomePage;
