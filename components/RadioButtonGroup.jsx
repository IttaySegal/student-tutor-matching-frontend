import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RTLText from "./RTLText";

const RadioButtonGroup = ({ label, options, selectedValue, onValueChange }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <RTLText style={{ textAlign: "right", marginBottom: 10 }}>
        {label}
      </RTLText>
      <View
        style={{
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => onValueChange(option.value)} // עדכון הערך הנבחר
            style={{
              flexDirection: "row-reverse", // הפוך את סדר הצגת האלמנטים (העיגול יהיה אחרי הטקסט)
              alignItems: "center",
              marginRight: 15, // פחות רווח בין הבחירות
              marginBottom: 5, // פחות רווח בין הבחירות
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor:
                  selectedValue === option.value ? "#007BFF" : "#ccc",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 1, // העיגול אחרי הטקסט
              }}
            >
              {selectedValue === option.value && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#007BFF",
                  }}
                />
              )}
            </View>
            <RTLText style={{ textAlign: "right", marginRight: 8 }}>
              {option.label}
            </RTLText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RadioButtonGroup;
