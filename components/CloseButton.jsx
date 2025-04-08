import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"; // או כל אייקון שתרצה

const CloseButton = ({ onPress, size = 30, color = "black", style }) => {
  return (
    <TouchableOpacity
      style={[{ position: "absolute", left: 10, top: 10 }, style]} // מיקום ברירת מחדל
      onPress={onPress}
    >
      <Icon name="close" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default CloseButton;
