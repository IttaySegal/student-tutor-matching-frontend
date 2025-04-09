import React from "react";
import { Text } from "react-native";

const RTLText = ({ children, style, ...props }) => {
  return (
    <Text
      style={[
        {
          textAlign: "right", // תיאום הטקסט לימין
          writingDirection: "rtl", // הגדרת כיווניות לימין
        },
        style, // כל סטייל שאתה מעביר לפונקציה
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default RTLText;
