// export default Profile
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext"; // מייבאים את ה-hook של ה-auth
import RTLText from "../../components/RTLText";
import CustomButton from "../../components/CustomButton"; // מייבאים את CustomButton
import Icon from "react-native-vector-icons/MaterialIcons"; // מייבאים את אייקון המייל מתוך ספריית vector-icons
import { roleOptions } from "../../constants/roleOptions";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth(); // שולפים את המידע על המשתמש

  // המרת תפקידים
  const userRole = roleOptions[user?.role] || user?.role; // אם לא נמצא תפקיד, נשתמש בתפקיד המקורי

  if (!isAuthenticated) {
    return (
      <RTLText style={{ textAlign: "center", fontSize: 18 }}>
        נא להתחבר כדי לראות את הפרופיל
      </RTLText>
    );
  }

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <RTLText style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        הפרופיל שלי
      </RTLText>

      {/* אימייל */}
      <View style={[styles.inputContainer, { marginBottom: 20 }]}>
        <RTLText style={{ fontWeight: "bold" }}>אימייל:</RTLText>
        <View style={styles.emailContainer}>
          <Icon
            name="mail-outline"
            size={20}
            color="#888"
            style={styles.emailIcon}
          />{" "}
          {/* אייקון mail-outline */}
          <Text style={styles.emailText}>
            {user?.email} {/* הצגת האימייל */}
          </Text>
        </View>
      </View>

      {/* תפקיד */}
      <View style={[styles.inputContainer, { marginBottom: 20 }]}>
        <RTLText style={{ fontWeight: "bold" }}>תפקיד:</RTLText>
        <RTLText style={styles.emailText}>
          {userRole} {/* הצגת התפקיד */}
        </RTLText>
      </View>

      {/* כפתור התנתקות */}
      <CustomButton
        title="התנתקות"
        handlePress={logout}
        isLoading={false} // אם אתה רוצה להוסיף מצב טעינה, תוכל לשנות ל-true
        containerStyles="bg-red-500 w-full" // כפתור רחב
        textStyles="text-white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  emailIcon: {
    marginRight: 8,
  },
  emailText: {
    fontSize: 16,
    color: "#888", // הצבע הבהיר של הכתובת
  },
});

export default Profile;
