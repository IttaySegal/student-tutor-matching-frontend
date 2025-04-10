import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import { roleOptions } from "../../constants/roleOptions";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();

  // Convert roles
  const userRole = roleOptions[user?.role] || user?.role;

  if (!isAuthenticated) {
    return (
      <Text style={{ textAlign: "center", fontSize: 18 }}>
        Please sign in to view your profile
      </Text>
    );
  }

  return (
    <View className="flex-1 bg-primary px-5 py-6">
      <View className="flex-1">
        <Text className="text-2xl font-bold text-white mb-6 text-center">
          My Profile
        </Text>

        {/* Email */}
        <View className="w-full mb-6">
          <Text className="font-bold text-white mb-2">
            Email:
          </Text>
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

        {/* Role */}
        <View className="w-full mb-6">
          <Text className="font-bold text-white mb-2">
            Role:
          </Text>
          <View className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <Text className="text-gray-300 text-base">
              {userRole}
            </Text>
          </View>
        </View>
      </View>

      {/* Logout button */}
      <CustomButton
        title="Logout"
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
