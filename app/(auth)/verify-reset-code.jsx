import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useLocalSearchParams, router } from 'expo-router';
import { verifyResetCode } from '../../services/authService';
import { images } from '../../constants';


  
const VerifyResetCode = () => {
  const { email } = useLocalSearchParams();
  const [resetCode, setResetCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyCode = async () => {
    if (!resetCode) {
      Alert.alert("Error", "Please enter the reset code");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await verifyResetCode(email, resetCode);
      if (response.success) {
        router.push({ pathname: '/change-password', params: { tempToken: response.tempToken } });
      } else {
        Alert.alert("Error", response.message || "Failed to verify reset code");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.newLogoBig}
            resizeMode="contain"
            className="w-[136px] h-[80px]"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Enter Your Reset Code
          </Text>
          <FormField
            title="Reset Code"
            value={resetCode}
            handleChangeText={setResetCode}
            keyboardType="numeric"
            otherStyles="mt-7"
          />
          <CustomButton
            title="Verify Code"
            handlePress={handleVerifyCode}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyResetCode;

VerifyResetCode.options = {
    headerShown: false,
  };
  