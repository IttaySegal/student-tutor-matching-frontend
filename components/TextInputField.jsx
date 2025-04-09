import React from "react";
import { View, Text, TextInput } from "react-native";
import RTLText from "./RTLText";

// קומפוננטה גנרית לשדה טקסט חופשי
const TextInputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}) => {
  return (
    <View style={{ marginBottom: 20, width: "100%" }}>
      {/* טקסט לתיאור השדה */}
      <RTLText
        style={{
          marginBottom: 5,
          fontSize: 16,
        }}
      >
        {label}
      </RTLText>

      {/* שדה טקסט */}
      <TextInput
        style={{
          height: multiline ? 100 : 40, // אם multiline אז גובה יותר גדול
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          textAlign: "right",
          writingDirection: "rtl", // הגדרת כיוון כתיבה מימין לשמאל
          direction: "rtl", // הוספתי את זה כאן
          padding: 10,
        }}
        multiline={multiline} // אם מדובר בשדה מרובה שורות
        numberOfLines={multiline ? 4 : 1} // אם multiline, מספר השורות המקסימליות
        placeholder={placeholder} // פלייסהולדר לשדה
        value={value} // הערך הנוכחי של השדה
        onChangeText={onChangeText} // עדכון הערך של השדה
      />
    </View>
  );
};

export default TextInputField;
