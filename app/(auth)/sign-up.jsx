import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

import FormField from '../../components/FormField'; 
import CustomButton from '../../components/CustomButton';
import { images } from '../../constants';

// Import the service
import { registerUser } from '../../services/authService';

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    try {
      setIsSubmitting(true);
      // Use our new service function
      const data = await registerUser({
        username: form.username,
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        country: form.country,
        password: form.password,
      });

      alert('Registration successful!');
      console.log('Server Response:', data);

      router.push('/sign-in');
    } catch (error) {
      console.error('Registration Failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h=[35px]"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          {/* If you have firstname, lastname, country fields, add those as well */}

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
