import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import RTLText from "./RTLText";
import CustomButton from "./CustomButton";

const RequestModal = ({ visible, request, onClose, onApprove, onReject }) => {
  if (!request) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <RTLText style={styles.title}>פרטי הבקשה</RTLText>
          <RTLText style={styles.detail}>סוג הבקשה: {request.type}</RTLText>
          <RTLText style={styles.detail}>משתמש: {request.user}</RTLText>

          <View style={styles.buttonRow}>
            <CustomButton
              title="אשר"
              handlePress={onApprove}
              containerStyles="bg-green-500 mr-2 flex-1"
              textStyles="text-white"
            />
            <CustomButton
              title="חסום"
              handlePress={onReject}
              containerStyles="bg-red-500 ml-2 flex-1"
              textStyles="text-white"
            />
          </View>

          <CustomButton
            title="סגור"
            handlePress={onClose}
            containerStyles="w-full bg-gray-500 mt-4"
            textStyles="text-white"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    direction: "rtl",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "right",
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "right",
  },
  buttonRow: {
    flexDirection: "row-reverse",
    marginTop: 20,
  },
});

export default RequestModal;
