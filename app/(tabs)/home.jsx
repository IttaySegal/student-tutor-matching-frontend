import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Redirect, router } from 'expo-router';
import CustomButton from '../../components/CustomButton'; // ✅ Import the custom button

const Home = () => {
  const { isAuthenticated, loading, logout } = useAuth();


  // if (!loading && !isAuthenticated) return <Redirect href="/" />;
  // useEffect(() => {
  //   if (!loading && !isAuthenticated) {
  //     router.replace('/');
  //   }
  // }, [loading, isAuthenticated]);

  const handleLogout = async () => {
    await logout();              // ✅ Clear auth state + AsyncStorage
    // console.log("logOut1")
    // router.replace("/index");         // ✅ Navigate to main page (index.jsx)
    // console.log("logOut2")

  };

  // if (loading || !isAuthenticated) return null;

  return (
    <View className="flex-1 justify-center items-center bg-primary px-4">
      <Text className="text-white text-2xl mb-6">Welcome to Home!</Text>

      <CustomButton
        title="Log Out"
        handlePress={handleLogout}
        containerStyles="w-full mt-4"
      />
    </View>
  );
};

export default Home;
