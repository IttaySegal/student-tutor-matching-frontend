import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import RTLText from "./RTLText";

const RequestCard = ({ type, user, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <RTLText style={styles.text}>• {type} מ־{user}</RTLText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    elevation: 2,
  },
  content: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "right",
  },
});

export default RequestCard;
