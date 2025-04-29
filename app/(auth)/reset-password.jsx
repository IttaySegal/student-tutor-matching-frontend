// reset-password.jsx
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import isEmail from 'validator/lib/isEmail';
import { resetPassword } from '../../services/authService';
import { images } from '../../constants';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    if (email === "") return Alert.alert("Error", "Please enter your email address");
    if (emailError) return Alert.alert("Error", "Please fix the errors before submitting");

    setIsSubmitting(true);
    try {
      const response = await resetPassword(email);
      console.log("Reset Password Response:", response);
      if (response.success) {
        Alert.alert("Success", "Password reset email sent successfully");
        router.replace({ pathname: "/verify-reset-code", params: { email } }); // 👈 GO TO NEXT STEP
      } else {
        Alert.alert("Error", response.message || "Failed to send reset password email");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(!isEmail(value) ? "Please enter a valid email address" : '');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.newLogoBig} resizeMode='contain' className="w-[136px] h-[80px]" />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Reset Your Password</Text>
          <FormField
            title="Email"
            value={email}
            handleChangeText={handleEmailChange}
            error={emailError}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <CustomButton title="Reset Password" handlePress={handleResetPassword} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Remember your password?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;