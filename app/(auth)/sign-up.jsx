// Import necessary modules and components
import { View, Text, ScrollView, Image } from 'react-native'; // Core React Native components for layout and styling
import React, { useState } from 'react'; // React and useState hook for managing state
import { SafeAreaView } from 'react-native-safe-area-context'; // Ensures content stays within safe area boundaries
import { images } from '../../constants'; // Import image assets from a centralized constants file
import FormField from '../../components/FormField'; // Custom input field component for reusable forms
import CustomButton from '../../components/CustomButton'; // Custom button component for actions
import { Link } from 'expo-router'; // Navigation component for routing between screens

// Define the SignUp component
const SignUp = () => {
    // State to manage form inputs
    const [form, setForm] = useState({
        username: '', // Stores the username entered by the user
        email: '', // Stores the email entered by the user
        password: '' // Stores the password entered by the user
    });

    // State to manage submission status (e.g., showing a loading indicator)
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Function to handle form submission (currently a placeholder)
    const submit = () => {
        // Logic for handling sign-up form submission goes here
    };

    return (
        // SafeAreaView to ensure the content fits within the device's safe area
        <SafeAreaView className="bg-primary h-full">
            {/* ScrollView to allow scrolling for content that exceeds the screen height */}
            <ScrollView>
                <View className="w-full justify-center min-h-[83vh] px-4 my-6">
                    {/* Display the app's logo */}
                    <Image
                        source={images.logo} // Logo image source from the constants file
                        resizeMode='contain' // Ensures the image fits properly within its container
                        className="w-[115px] h=[35px]" // Styling for the image dimensions
                    />
                    {/* Title for the sign-up screen */}
                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Sign up to Aora
                    </Text>
                    {/* Input field for the username */}
                    <FormField
                        title="Username" // Label for the input field
                        value={form.username} // Current value of the username from state
                        handleChangeText={(e) => setForm({ ...form, username: e })} // Updates the username in state
                        otherStyles="mt-10" // Additional styling for margin
                    />
                    {/* Input field for the email */}
                    <FormField
                        title="Email" // Label for the input field
                        value={form.email} // Current value of the email from state
                        handleChangeText={(e) => setForm({ ...form, email: e })} // Updates the email in state
                        otherStyles="mt-7" // Additional styling for margin
                        keyboardType="email-address" // Ensures appropriate keyboard for email input
                    />
                    {/* Input field for the password */}
                    <FormField
                        title="Password" // Label for the input field
                        value={form.password} // Current value of the password from state
                        handleChangeText={(e) => setForm({ ...form, password: e })} // Updates the password in state
                        otherStyles="mt-7" // Additional styling for margin
                    />
                    {/* Button for submitting the sign-up form */}
                    <CustomButton
                        title="Sign In" // Button text
                        handlePress={submit} // Function to handle the button press
                        containerStyles="mt-7" // Additional styling for the button container
                        isLoading={isSubmitting} // Displays a loading indicator if the form is submitting
                    />
                    {/* Navigation link to the sign-in screen */}
                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Have an account already?
                        </Text>
                        <Link
                            href="/sign-in" // Route to the sign-in screen
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
