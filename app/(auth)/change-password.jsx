import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { updatePassword } from '../../services/authService';
import { useLocalSearchParams, router } from 'expo-router';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { images } from '../../constants';

const ChangePassword = () => {
  const { tempToken } = useLocalSearchParams();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (password) => {
    if (!isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })) {
      return "Password must be at least 8 characters, with at least 1 uppercase letter, 1 lowercase letter, and 1 number";
    }
    return '';
  };

  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
    const error = validatePassword(value);
    setPasswordError(error);
  };

  // Function to handle password update @TODO add red flag when the password don't match
  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      return Alert.alert('Error', 'All fields are required');
    }

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    setIsSubmitting(true);
    try {
      const response = await updatePassword(tempToken, newPassword, confirmPassword);
      if (response.success) {
        Alert.alert('Success', 'Password updated successfully');
        router.replace('/sign-in');
      } else {
        Alert.alert('Error', response.message || 'Failed to update password');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong in the server');
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
            Set New Password
          </Text>
          <FormField
            title="New Password"
            value={newPassword}
            handleChangeText={handleNewPasswordChange}
            otherStyles="mt-7"
            secureTextEntry
            error={passwordError}
          />
          <FormField
            title="Confirm Password"
            value={confirmPassword}
            handleChangeText={setConfirmPassword}
            otherStyles="mt-5"
            secureTextEntry
          />
          <CustomButton
            title="Update Password"
            handlePress={handleUpdatePassword}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
