import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
      <View style={{ width: "100%", marginBottom: 20 }}>
        <RTLText style={{ fontWeight: "bold", marginBottom: 8 }}>
          אימייל:
        </RTLText>
        <View style={styles.emailContainer}>
          <Icon
            name="mail-outline"
            size={20}
            color="#888"
            style={styles.emailIcon}
          />
          {/* אייקון mail-outline */}
          <Text style={styles.emailText}>
            {user?.email} {/* הצגת האימייל */}
          </Text>
        </View>
      </View>

      {/* תפקיד */}
      <View style={{ width: "100%", marginBottom: 20 }}>
        <RTLText style={{ fontWeight: "bold", marginBottom: 8 }}>
          תפקיד:
        </RTLText>
        <View style={styles.roleContainer}>
          <RTLText style={styles.emailText}>
            {userRole} {/* הצגת התפקיד */}
          </RTLText>
        </View>
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
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  emailIcon: {
    marginRight: 8,
  },
  emailText: {
    fontSize: 16,
    color: "#888", // הצבע הבהיר של הכתובת
  },
  roleContainer: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
});

export default Profile;
