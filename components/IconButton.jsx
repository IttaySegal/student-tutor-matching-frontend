import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // ניתן להשתמש ב-@expo/vector-icons לאייקונים

const IconButton = ({ onPress, icon, title, style, textStyle }) => (
  <TouchableOpacity
    style={[styles.button, style]} // אפשר להוסיף סגנונות נוספים לכפתור אם צריך
    onPress={onPress}
  >
    <View style={styles.iconContainer}>
      <FontAwesome5 name={icon} size={20} color="white" /> {/* האייקון */}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text> {/* הטקסט */}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF", // צבע רקע לכפתור
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
});

export default IconButton;
