import React from "react";
import { Text, StyleSheet, View } from "react-native";

const PageHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "flex-end", // Align the title to the right within the container
    width: "100%", // Ensure the container takes the full screen width
  },
  title: {
    fontSize: 24, // Consistent font size for the header
    fontWeight: "600", // Semi-bold text
    color: "#fff", // White color for the title
    marginBottom: 10, // Space below the title
    fontFamily: "Roboto", // Optional: replace with a different font if needed
    textAlign: "right", // Align the text to the right
  },
});

export default PageHeader;
