import React from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ApproveButton({ onPress, disabled, isLoading }) {
  const isButtonDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, isButtonDisabled && styles.disabled]}
      disabled={isButtonDisabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Icon name="check" size={28} color="#fff" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#22c55e", // ירוק
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  disabled: {
    opacity: 0.5,
  },
});
