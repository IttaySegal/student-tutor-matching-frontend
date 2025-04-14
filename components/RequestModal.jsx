import React from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import CustomButton from "./CustomButton";
import CloseButton from "./CloseButton";


const RequestModal = ({ visible, request, onClose, onApprove, onReject }) => {
  if (!request) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
        <CloseButton onPress={onClose} />
          <Text style={styles.title}>Request Details</Text>
          <Text style={styles.detail}>Request Type: {request.type}</Text>
          <Text style={styles.detail}>User: {request.user}</Text>

          <View style={styles.buttonRow}>
            <CustomButton
              title="Approve"
              handlePress={onApprove}
              containerStyles="bg-green-500 mr-2 flex-1"
              textStyles="text-white"
            />
            <CustomButton
              title="Reject"
              handlePress={onReject}
              containerStyles="bg-red-500 ml-2 flex-1"
              textStyles="text-white"
            />
          </View>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "left", // LTR
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "left", // LTR
  },
  buttonRow: {
    flexDirection: "row", // LTR direction
    marginTop: 20,
  },
});

export default RequestModal;
