import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

export default function RadioButtonGroup({
  label,
  options,
  selectedValue,
  onValueChange,
  containerStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.optionContainer}
            onPress={() => onValueChange(option.value)}
          >
            <View style={styles.radioButton}>
              {selectedValue === option.value && (
                <View style={styles.selected} />
              )}
            </View>
            <Text style={styles.optionLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  optionLabel: {
    fontSize: 16,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
});
