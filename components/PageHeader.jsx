import React from "react";
import { Text, StyleSheet, View } from "react-native";
import RTLText from "./RTLText"; // לוודא שיש לך את RTLText

const PageHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <RTLText style={styles.title}>{title}</RTLText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "flex-end", // הכותרת תתיישב לימין בתוך ה-View
    width: "100%", // לוודא שהקונטיינר תופס את כל רוחב המסך
  },
  title: {
    fontSize: 24, // גודל אחיד לכותרת
    fontWeight: "600", // עיבוי קל
    color: "#fff", // צבע לבן לכותרת
    marginBottom: 10, // רווח למטה מהכותרת
    fontFamily: "Roboto", // פונט יפה (אם יש לך פונט אחר, תוכל להוסיף אותו כאן)
    textAlign: "right", // לוודא שהטקסט יהיה מימין לשמאל
  },
});

export default PageHeader;
