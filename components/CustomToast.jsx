// components/CustomToast.jsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Modal,                 // 👈 NEW
  TouchableWithoutFeedback,
} from "react-native";

const { width } = Dimensions.get("window");

const CustomToast = ({ text1, text2, onHide }) => {
  // keep the Animated.Value stable across renders
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // auto‑dismiss after 3 s
    const timer = setTimeout(onHide, 3000);
    return () => clearTimeout(timer);
  }, [fadeAnim, onHide]);

  return (
    <Modal transparent visible animationType="fade" onRequestClose={onHide}>
      {/*  dismiss early by tapping outside */}
      <TouchableWithoutFeedback onPress={onHide}>
        <View style={styles.overlayContainer}>
          <Animated.View style={[styles.toastContent, { opacity: fadeAnim }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toastTitle}>{text1}</Text>
              {text2 ? <Text style={styles.toastSubtitle}>{text2}</Text> : null}
            </View>

            <TouchableOpacity onPress={onHide}>
              <Text style={styles.toastClose}>✕</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,          // distance from top of the screen
    backgroundColor: "transparent",
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
