// import React from "react";
// import { Modal, View, StyleSheet, Text } from "react-native";
// import CustomButton from "./CustomButton";
// import CloseButton from "./CloseButton";


// const RequestModal = ({ visible, request, onClose, onApprove, onReject }) => {
//   if (!request) return null;

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.modal}>
//         <CloseButton onPress={onClose} />
//           <Text style={styles.title}>Request Details</Text>
//           <Text style={styles.detail}>Request Type: {request.type}</Text>
//           <Text style={styles.detail}>User: {request.user}</Text>

//           <View style={styles.buttonRow}>
//             <CustomButton
//               title="Approve"
//               handlePress={onApprove}
//               containerStyles="bg-green-500 mr-2 flex-1"
//               textStyles="text-white"
//             />
//             <CustomButton
//               title="Reject"
//               handlePress={onReject}
//               containerStyles="bg-red-500 ml-2 flex-1"
//               textStyles="text-white"
//             />
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modal: {
//     width: "90%",
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 12,
//     textAlign: "left", // LTR
//   },
//   detail: {
//     fontSize: 16,
//     marginBottom: 8,
//     textAlign: "left", // LTR
//   },
//   buttonRow: {
//     flexDirection: "row", // LTR direction
//     marginTop: 20,
//   },
// });

// export default RequestModal;
// RequestModal.js
// RequestModal.js
import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import CloseButton from "./CloseButton";
import CustomButton from "./CustomButton";

const RequestModal = ({
  visible,
  onClose,
  children,
  showFooter = false,
  onApprove,
  onReject,
  onModalHide,          // optional
}) => {
  // fire onModalHide whenever `visible` flips to false
  const prevVisible = useRef(visible);
  useEffect(() => {
    if (prevVisible.current && !visible && onModalHide) {
      onModalHide();
    }
    prevVisible.current = visible;
  }, [visible, onModalHide]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onDismiss={onModalHide}     // iOS
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modal}>
              <CloseButton onPress={onClose} />

              <View style={{ marginTop: 24 }}>{children}</View>

              {showFooter && (
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
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
  buttonRow: {
    flexDirection: "row",
    marginTop: 24,
  },
});

export default RequestModal;
