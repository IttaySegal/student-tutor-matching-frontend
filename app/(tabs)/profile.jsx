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
    <View className="flex-1 bg-primary px-5 py-6">
      <RTLText className="text-2xl font-bold text-white mb-6">
        הפרופיל שלי
      </RTLText>

      {/* אימייל */}
      <View className="w-full mb-6">
        <RTLText className="font-bold text-white mb-2">
          אימייל:
        </RTLText>
        <View className="flex-row items-center bg-gray-800 rounded-lg p-3 border border-gray-700">
          <Icon
            name="mail-outline"
            size={20}
            color="#9CA3AF"
            style={{ marginRight: 8 }}
          />
          <Text className="text-gray-300 text-base">
            {user?.email}
          </Text>
        </View>
      </View>

      {/* תפקיד */}
      <View className="w-full mb-6">
        <RTLText className="font-bold text-white mb-2">
          תפקיד:
        </RTLText>
        <View className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <RTLText className="text-gray-300 text-base">
            {userRole}
          </RTLText>
        </View>
      </View>

      {/* כפתור התנתקות */}
      <CustomButton
        title="התנתקות"
        handlePress={logout}
        isLoading={false}
        containerStyles="bg-red-500 w-full"
        textStyles="text-white"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
