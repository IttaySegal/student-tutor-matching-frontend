import React from "react";
import { View, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import RTLText from "@/components/RTLText";

export default function Profile() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <RTLText style={styles.text}>
        שלום {user?.first_name}!
      </RTLText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
}); 