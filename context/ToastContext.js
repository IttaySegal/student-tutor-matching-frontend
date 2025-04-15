import React, { createContext, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

const { width, height } = Dimensions.get("window");

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = ({
    message,
    subMessage,
    type = "info",        // 'success' | 'error' | 'info'
    duration = 3000       // default 3 seconds
  }) => {
    setToast({ message, subMessage, type });

    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const hideToast = () => setToast(null);

  const getToastColor = (type) => {
    switch (type) {
      case "success":
        return "#D1FAE5"; // green-100
      case "error":
        return "#FECACA"; // red-100
      case "info":
      default:
        return "#DBEAFE"; // blue-100
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case "success":
        return "#065F46"; // dark green
      case "error":
        return "#991B1B"; // dark red
      case "info":
      default:
        return "#1E3A8A"; // dark blue
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "info":
      default:
        return "ℹ️";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <View style={styles.overlay}>
          <View style={[styles.toast, { backgroundColor: getToastColor(toast.type) }]}>
            <View style={styles.iconWrapper}>
              <Text style={styles.icon}>{getIcon(toast.type)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.message, { color: getTextColor(toast.type) }]}>
                {toast.message}
              </Text>
              {toast.subMessage && (
                <Text style={[styles.subMessage, { color: getTextColor(toast.type) }]}>
                  {toast.subMessage}
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={hideToast}>
              <Text style={[styles.close, { color: getTextColor(toast.type) }]}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 16,
    maxWidth: width - 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  iconWrapper: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
  },
  message: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  subMessage: {
    fontSize: 16,
  },
  close: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
  },
});

export default ToastContext;
