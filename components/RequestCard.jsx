import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const RequestCard = ({ type, user, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.type}>{type}</Text>
      </View>
      <Text style={styles.user}>From: {user}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 8,
  },
  type: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  user: {
    fontSize: 16,
    color: "#666",
  },
});

export default RequestCard;
