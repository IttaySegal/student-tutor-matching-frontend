import { View, Modal } from "react-native";
import RTLText from "./RTLText";
import CustomButton from "./CustomButton";

export default function LessonDetailsModal({
  visible,
  onClose,
  subject,
  grade,
  date,
  day,
  startTime,
  endTime,
  mentor,
  description,
  students = [],
  isMentor,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
        <View
          className="bg-white rounded-2xl p-6 w-11/12 max-w-md"
          style={{ direction: "rtl", alignItems: "flex-start" }}
        >
          <RTLText style={{ fontSize: 18, fontWeight: "bold" }}>
            שיעור ב{subject} – {grade}
          </RTLText>
          <RTLText>
            {day}, {date}
          </RTLText>
          <RTLText>
            משעה {startTime} עד {endTime}
          </RTLText>
          <RTLText>
            החונכ{isMentor ? "ת" : ""}: {mentor}
          </RTLText>

          <RTLText style={{ marginTop: 10, fontWeight: "bold" }}>
            תיאור השיעור:
          </RTLText>
          <RTLText>{description}</RTLText>

          <RTLText style={{ marginTop: 10, fontWeight: "bold" }}>
            חניכים שנרשמו:
          </RTLText>
          {students.length === 0 ? (
            <RTLText>לא נרשמו חניכים עדיין.</RTLText>
          ) : (
            students.map((name, i) => <RTLText key={i}>• {name}</RTLText>)
          )}

          {/* אזור כפתורים */}
          <View className="w-full mt-8 items-center">
            <CustomButton
              title={isMentor ? "ניהול שיעור" : "הצטרפות לשיעור"}
              handlePress={() =>
                console.log(isMentor ? "ניהול שיעור" : "הצטרפות")
              }
              containerStyles="w-4/5"
            />

            <CustomButton
              title="סגור"
              handlePress={onClose}
              containerStyles="w-4/5 bg-gray-500 mt-6"
              textStyles="text-white"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
