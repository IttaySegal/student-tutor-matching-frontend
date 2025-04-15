import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CustomToast = ({ text1, text2, onHide }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{text1}</Text>
          {text2 && <Text style={styles.subtitle}>{text2}</Text>}
        </View>
        <TouchableOpacity onPress={onHide}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    left: 20,
    right: 20,
    transform: [{ translateY: -50 }],
    zIndex: 9999,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  close: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    color: "#999",
  },
});

export default CustomToast;
