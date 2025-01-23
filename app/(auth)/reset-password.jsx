// Import necessary modules and components
import { View, Text, ScrollView, Image, Alert } from 'react-native'; // Core components for layout and display
import React, { useState } from 'react'; // React and useState for managing component state
import { SafeAreaView } from 'react-native-safe-area-context'; // Ensures content is within safe area boundaries
import FormField from '../../components/FormField'; // Custom input field component
import CustomButton from '../../components/CustomButton'; // Custom reusable button component
import { Link, router } from 'expo-router'; // Navigation link for routing
import isEmail from 'validator/lib/isEmail';
import { resetPassword } from '../../services/authService'; // Import reset password function from auth service
import { images } from '../../constants'; // Import image assets from constants

// Define the ResetPassword component
const ResetPassword = () => {
    // State to manage email input
    const [email, setEmail] = useState('');

    // State for validation error
    const [emailError, setEmailError] = useState('');

    // State to manage submission status
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Function to handle form submission
    const handleResetPassword = async () => {
        if (email === "") {
            Alert.alert("Error", "Please enter your email address");
            return;
        }

        if (emailError) {
            Alert.alert("Error", "Please fix the errors before submitting");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await resetPassword(email); // Calls reset password service
            console.log("Reset Password Response:", response); // ✅ Debug the response

            if (response.success) {
                Alert.alert("Success", "Password reset email sent successfully");
                router.replace("/sign-in"); // Navigate back to the sign-in page
            } else {
                Alert.alert("Error", response.message || "Failed to send reset password email");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle email change and validate
    const handleEmailChange = (value) => {
        setEmail(value);
        if (!isEmail(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError('');
        }
    };

    return (
        // Ensures content remains within safe boundaries and styles the background
        <SafeAreaView className="bg-primary h-full">
            {/* ScrollView to handle content that may exceed the screen height */}
            <ScrollView>
                <View className="w-full justify-center min-h-[83vh] px-4 my-6">
                    <Image
                        source={images.newLogoBig} // Logo image source
                        resizeMode='contain' // Ensures the image fits within the container
                        // className="w-[115px] h=[35px]" // Styling for image size
                        className="w-[136px] h-[80px]" // Styling for image size
                    />
                    {/* Title for the reset password screen */}
                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Reset Your Password
                    </Text>
                    {/* Email input field */}
                    <FormField
                        title="Email" // Label for the input field
                        value={email} // Current email value from state
                        handleChangeText={handleEmailChange} // Updates the email in state with validation
                        error={emailError}
                        otherStyles="mt-7" // Additional margin styling
                        keyboardType="email-address" // Ensures appropriate keyboard type for email input
                    />
                    {/* Reset Password button */}
                    <CustomButton
                        title="Reset Password" // Button text
                        handlePress={handleResetPassword} // Calls the reset password function on press
                        containerStyles="mt-7" // Styling for button container
                        isLoading={isSubmitting} // Shows a loading indicator if the form is submitting
                    />
                    {/* Navigation link back to sign-in screen */}
                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Remember your password?
                        </Text>
                        <Link
                            href="/sign-in" // Navigates to the sign-in screen
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

export default ResetPassword;
