import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RTLText from "../../components/RTLText";

const MentorHome = ({ userName }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "בוקר טוב";
    if (currentHour < 17) return "צהריים טובים";
    if (currentHour < 20) return "ערב טוב";
    return "לילה טוב";
  };

  return (
    <View style={styles.container}>
      <RTLText style={styles.title}>
        {getGreeting()}, {userName}
      </RTLText>
      <RTLText style={styles.description}>
        כאן תוכל לנהל את השיעורים שלך ולעזור לחניכים להצליח.
      </RTLText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "right",
  },
});

export default MentorHome;
