import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { verifyResetCode } from '../../services/authService';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const VerifyResetCode = () => {
  const { email } = useLocalSearchParams();
  const [resetCode, setResetCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ref = useBlurOnFulfill({ value: resetCode, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: resetCode,
    setValue: setResetCode,
  });

  const handleVerifyCode = async () => {
    if (!resetCode || resetCode.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit reset code");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await verifyResetCode(email, resetCode.trim());
      if (response.success) {
        router.replace({ pathname: '/change-password', params: { tempToken: response.tempToken } });
      } else {
        Alert.alert("Error", response.message || "Failed to verify reset code");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong in the server");
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

          <CodeField
            ref={ref}
            {...props}
            value={resetCode}
            onChangeText={setResetCode}
            cellCount={CELL_COUNT}
            rootStyle={{ marginTop: 30 }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={{
                  width: 40,
                  height: 50,
                  lineHeight: 38,
                  marginHorizontal: 6,
                  borderWidth: 2,
                  borderColor: isFocused ? '#fff' : '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                }}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text style={{ color: '#fff', fontSize: 24 }}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />

          <CustomButton
            title="Verify Code"
            handlePress={handleVerifyCode}
            containerStyles="mt-10"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyResetCode;