// Import necessary modules and components from React Native and external libraries
import { View, Text, ScrollView, Image, Alert, I18nManager  } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'; // Ensures UI doesn't overlap with notches/status bars
import { images } from '../../constants'; // App images (e.g., logo)
import FormField from '../../components/FormField'; // Reusable input field component
import CustomButton from '../../components/CustomButton'; // Reusable button with loading support
import { Link, router } from 'expo-router'; // For navigation
import isEmail from 'validator/lib/isEmail'; // Email validation
import { useAuth } from '../../context/AuthContext'; // 🔐 Auth context to access login function
import { CommonActions, useNavigation } from '@react-navigation/native';


// SignIn component: the login screen
const SignIn = () => {
    // State for the form fields
    const [form, setForm] = useState({ email: '', password: '' });

    // State for email validation error
    const [emailError, setEmailError] = useState('');

    // State to show loading spinner during form submission
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get login function from auth context
    const { login } = useAuth();

    //const navigation = useNavigation();

    /**
     * Handles the form submission when the user presses "Sign In"
     */
    const submit = async () => {
        // Check for empty fields
        if (form.email === '' || form.password === '') {
            Alert.alert('שגיאה, אנא מלא את כל השדות');
            return;
        }

        // Check for email validation error
        if (emailError) {
            Alert.alert('שגיאה, אנא ספק כתובת אימייל תקינה');
            return;
        }

        // Begin form submission
        setIsSubmitting(true);
        try {
            // Attempt to login using AuthContext
            await login({ email: form.email, password: form.password });

            // router.replace('/(tabs)/home'); // This clears the previous group stack

            // If successful, navigate to the home screen
            // router.replace("/home")
            //router.back();
            router.replace('/(tabs)/HomePage'); 


            // navigation.dispatch(
            //     CommonActions.reset({
            //         index: 0,
            //         routes: [{ name: '/(tabs)/home' }],
            //     })
            // );

        } catch (error) {
            console.error("שגיאת התחברות:", error);
            // Show alert on login failure
            Alert.alert('שגיאה', error.message || 'התחברות נכשלה');
        } finally {
            // End loading spinner regardless of success/failure
            setIsSubmitting(false);
        }
    };

    /**
     * Validates and updates email field in form state
     * @param {string} value - user's input in the email field
     */
    const handleEmailChange = (value) => {
        setForm({ ...form, email: value });

        // Validate email format and show error if invalid
        if (!isEmail(value)) {
            setEmailError('יש להזין כתובת מייל תקינה');
        } else {
            setEmailError('');
        }
    };

    // Return the screen UI
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[83vh] px-4 my-6">

                    {/* Logo */}
                    <Image
                        source={images.newLogoBig}
                        resizeMode="contain"
                        className="w-[136px] h-[80px]"
                    />

                    {/* Screen Title */}
                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        התחבר למערכת
                    </Text>

                    {/* Email Input Field */}
                    <FormField
                        title="אימייל"
                        value={form.email}
                        handleChangeText={handleEmailChange} // Live validation on change
                        error={emailError} // Show email error message
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    {/* Password Input Field */}
                    <FormField
                        title="סיסמה"
                        value={form.password}
                        handleChangeText={(e) => setForm(prev => ({ ...prev, password: e }))}
                        otherStyles="mt-7"
                        secureTextEntry 

                    />

                    {/* Sign In Button with loading spinner */}
                    <CustomButton
                        title="התחבר"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    {/* Link to Sign Up screen */}
                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            ?אין לך חשבון
                        </Text>
                        <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
                           הירשם עכשיו
                        </Link>
                    </View>

                    {/* Link to Password Reset screen */}
                    <View className="flex justify-center pt-3 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            שכחת את הסיסמה?
                        </Text>
                        <Link href="/reset-password" className="text-lg font-psemibold text-secondary">
                            איפוס סיסמא
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
