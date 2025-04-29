import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"; // או כל אייקון שתרצה

const CloseButton = ({ onPress, size = 30, color = "black", style }) => {
  return (
    <TouchableOpacity
      style={[{ position: "absolute", right: 10, top: 10 }, style]}
      onPress={onPress}
    >
      <Icon name="close" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default CloseButton;
