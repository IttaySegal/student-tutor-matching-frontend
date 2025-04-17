// import React, { useState } from "react";
// import { View, Text, StyleSheet, Modal } from "react-native";
// import CustomButton from "./CustomButton";
// import { useLesson } from "@context/LessonContext";
// import { useToast } from "@/context/ToastContext";
// import CloseButton from "./CloseButton";

// export default function ReviewCard({ review, visible, onClose, onReviewComplete }) {
//   const { approveLesson, rejectLesson } = useLesson();
//   const { showToast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleApprove = async () => {
//     if (isLoading) return;
//     setIsLoading(true);
  
//     await approveLesson(review.id);
//     showToast({
//       message: "Lesson approved!",
//       subMessage: "Your lesson is now live 🎉",
//       type: "success",
//     });
  
//     onReviewComplete?.();
//     onClose();
//     setIsLoading(false);
//   };

//   const handleReject = async () => {
//     if (isLoading) return;
//     setIsLoading(true);
  
//     await rejectLesson(review.id);
//     showToast({
//       message: "Lesson rejected",
//       type: "info",
//     });
  
//     onReviewComplete?.();
//     onClose();
//     setIsLoading(false);
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
//         <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
//           <CloseButton onPress={onClose} />
//           <Text style={styles.title}>Lesson: {review.subject} - Grade {review.grade}</Text>
//           <Text style={styles.subtitle}>Mentor: {review.mentor}</Text>
//           <Text>Date: {review.date} | Time: {review.startTime} - {review.endTime}</Text>

//           <Text style={styles.sectionTitle}>Descriptions:</Text>
//           {review.selectedDescriptions.map((desc, i) => (
//             <Text key={i} style={styles.item}>• {desc}</Text>
//           ))}

//           <Text style={styles.sectionTitle}>Attendance:</Text>
//           {Object.entries(review.studentAttendance).map(([id, status], i) => (
//             <Text key={i} style={styles.item}>
//               • {review.studentNames?.[id] || id}: {status}
//             </Text>
//           ))}

//           <Text style={styles.sectionTitle}>Rating: ⭐ {review.rating}/5</Text>

//           <View style={styles.actions}>
//             <CustomButton
//               title="Approve"
//               handlePress={handleApprove}
//               containerStyles="w-1/2 mr-2 bg-green-500"
//               isLoading={isLoading}
//             />
//             <CustomButton
//               title="Reject"
//               handlePress={handleReject}
//               containerStyles="w-1/2 bg-red-500"
//               isLoading={isLoading}
//             />
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     marginBottom: 8,
//     color: "#444",
//   },
//   sectionTitle: {
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   item: {
//     fontSize: 14,
//     color: "#333",
//   },
//   actions: {
//     flexDirection: "row",
//     marginTop: 12,
//   },
// });

import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { useLesson } from "@context/LessonContext";
import { useToast } from "@/context/ToastContext";
import CloseButton from "./CloseButton";
import ApproveButton from "./ApproveButton";
import RejectButton from "./RejectButton";
import CustomButton from "./CustomButton";

export default function ReviewCard({ review, visible, onClose, onReviewComplete }) {
  const { approveLesson, rejectLesson } = useLesson();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(null); // "approve" | "reject" | null

  const handleApprove = async () => {
    if (isSubmitting) return;
    setIsSubmitting("approve");

    await approveLesson(review.id);
    showToast({
      message: "Lesson approved!",
      subMessage: "Your lesson is now live 🎉",
      type: "success",
    });

    onReviewComplete?.();
    onClose();
    setIsSubmitting(null);
  };

  const handleReject = async () => {
    if (isSubmitting) return;
    setIsSubmitting("reject");

    await rejectLesson(review.id);
    showToast({
      message: "Lesson rejected",
      type: "info",
    });

    onReviewComplete?.();
    onClose();
    setIsSubmitting(null);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
          <CloseButton onPress={onClose} />
          
          <Text style={styles.title}>
            Lesson: {review.subject} - Grade {review.grade}
          </Text>
          <Text style={styles.subtitle}>Mentor: {review.mentor}</Text>
          <Text>
            Date: {review.date} | Time: {review.startTime} - {review.endTime}
          </Text>

          <Text style={styles.sectionTitle}>Descriptions:</Text>
          {review.selectedDescriptions.map((desc, i) => (
            <Text key={i} style={styles.item}>• {desc}</Text>
          ))}

          <Text style={styles.sectionTitle}>Attendance:</Text>
          {Object.entries(review.studentAttendance).map(([id, status], i) => (
            <Text key={i} style={styles.item}>
              • {review.studentNames?.[id] || id}: {status}
            </Text>
          ))}

          <Text style={styles.sectionTitle}>Rating: ⭐ {review.rating}/5</Text>

          <View style={styles.actions}>
            <CustomButton
              title="Approve"
              handlePress={handleApprove}
              containerStyles="w-1/2 mr-2 bg-green-500"
              isLoading={isSubmitting === "approve"}
              disabled={isSubmitting !== null}
            />
            <CustomButton
              title="Reject"
              handlePress={handleReject}
              containerStyles="w-1/2 bg-red-500"
              isLoading={isSubmitting === "reject"}
              disabled={isSubmitting !== null}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    color: "#444",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  item: {
    fontSize: 14,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
});
