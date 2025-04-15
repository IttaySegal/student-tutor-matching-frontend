import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

const { height, width } = Dimensions.get("window");

const CustomToast = ({ text1, text2, onHide }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onHide();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.overlayContainer}>
      <Animated.View style={[styles.toastContent, { opacity: fadeAnim }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.toastTitle}>{text1}</Text>
          {text2 && <Text style={styles.toastSubtitle}>{text2}</Text>}
        </View>
        <TouchableOpacity onPress={onHide}>
          <Text style={styles.toastClose}>✕</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  toastContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 12,
    maxWidth: width - 40,
  },
  toastTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#111827",
  },
  toastSubtitle: {
    fontSize: 14,
    color: "#4B5563",
  },
  toastClose: {
    fontSize: 18,
    marginLeft: 12,
    color: "#9CA3AF",
    fontWeight: "bold",
  },
});

export default CustomToast;
