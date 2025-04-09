import { View, Modal } from "react-native";
import RTLText from "./RTLText";
import CustomButton from "./CustomButton";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LessonEditModal from "./LessonEditModal"; // ייבוא ה-Modal של עריכת שיעור
import CloseButton from "../components/CloseButton"; // ייבוא הכפתור החדש

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
  lessonLocation,
}) {
  const { user } = useAuth();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // שומר אם ה-Edit Modal פתוח
  // קודם כל נוודא אם המשתמש הוא חניך
  const isStudent = user?.role === "student"; // אם הוא חניך
  const isMentor = user?.role === "mentor"; // אם הוא חונך

  const handleManageLesson = () => {
    setIsEditModalVisible(true); // פותח את ה-Modal לעריכת השיעור
  };

  // אם המשתמש הוא חניך, נבדוק אם הוא רשום לשיעור
  const isStudentRegistered =
    isStudent && students.some((student) => student._id === user?._id);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
        <View
          className="bg-white rounded-2xl p-6 w-11/12 max-w-md"
          style={{ direction: "rtl", alignItems: "flex-start" }}
        >
          {/* כפתור סגירה */}
          <CloseButton onPress={onClose} />
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
            החונך{isMentor ? "ת" : ""}: {mentor}
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
            students.map((student, i) => (
              <RTLText key={i}>
                • {student.first_name} {student.last_name}
              </RTLText>
            ))
          )}

          {/* אזור כפתורים */}
          <View className="w-full mt-8 items-center">
            {isStudent ? (
              // אם החניך לא רשום לשיעור
              isStudentRegistered ? (
                // אם החניך כבר רשום לשיעור
                <CustomButton
                  title="ביטול הרשמה"
                  handlePress={() => console.log("ביטול הרשמה")}
                  containerStyles="w-4/5 bg-red-500"
                />
              ) : // אם החניך לא רשום לשיעור
              students.length >= 3 ? (
                <RTLText>השיעור מלא</RTLText> // הצגת הודעה שהשיעור מלא
              ) : (
                <CustomButton
                  title="הירשם לשיעור"
                  handlePress={() => console.log("הרשמה לשיעור")}
                  containerStyles="w-4/5"
                />
              )
            ) : isMentor ? (
              // אם המשתמש הוא חונך (אפשר להוסיף כאן פעולות שקשורות לחונך)
              <CustomButton
                title="נהל שיעור"
                handlePress={handleManageLesson}
                containerStyles="w-4/5"
              />
            ) : (
              // אם המשתמש לא חניך ולא חונך (למשל במקרה של מנהל)
              <CustomButton
                title="הפעולה לא זמינה"
                handlePress={() => console.log("הפעולה לא זמינה")}
                containerStyles="w-4/5 bg-gray-500"
              />
            )}
          </View>
        </View>
      </View>
      {/* Modal של ניהול שיעור */}
      {isEditModalVisible && (
        <LessonEditModal
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)} // סגור את ה-Edit Modal
          subject={subject}
          grade={grade}
          date={date}
          day={day}
          startTime={startTime}
          endTime={endTime}
          mentor={mentor}
          description={description}
          students={students}
          lessonLocation={lessonLocation} // הוספנו את מיקום השיעור
          onSaveChanges={(newDescription, newLocation) => {
            // כאן תוכל לשמור את השינויים (למשל לשלוח בקשה לשרת)
          }}
          onDeleteLesson={() => {
            // כאן תוכל למחוק את השיעור
          }}
        />
      )}
    </Modal>
  );
}
