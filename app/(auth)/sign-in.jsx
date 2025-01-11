// Import necessary modules and components
import { View, Text, ScrollView, Image, Alert } from 'react-native'; // Core components for layout and display
import React, { useState } from 'react'; // React and useState for managing component state
import { SafeAreaView } from 'react-native-safe-area-context'; // Ensures content is within safe area boundaries
import { images } from '../../constants'; // Import image assets from constants
import FormField from '../../components/FormField'; // Custom input field component
import CustomButton from '../../components/CustomButton'; // Custom reusable button component
import { Link, router } from 'expo-router'; // Navigation link for routing
import isEmail from 'validator/lib/isEmail';
import { signIn } from '../../services/authService'; // Import sign-in function from auth service



// Define the SignIn component
const SignIn = () => {
    // State to manage form inputs
    const [form, setForm] = useState({
        email: '', // Email input
        password: '' // Password input
    });

    // States for validation errors
    const [emailError, setEmailError] = useState('');

    // State to manage submission status
    const [isSubmitting, setIsSubmitting] = useState(false);



    // Function to handle form submission (currently empty)
    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (emailError) {
            Alert.alert("Error", "Please fix the errors before submitting");
            return;
        }

        setIsSubmitting(true);
        try {
          
            // await signIn(form.email, form.password); //replaced with the following line + 1
            // uses axios function from services/authService.js
            const response = await signIn({ email: form.email, password: form.password });
            console.log("Sign-in Response:", response);  // ✅ Debug the response

            if (response.success ) {
                router.replace("/home");
            } else {
                Alert.alert("Error", response.message || "Sign-in failed");
            }
            
            // global provider function?
            // const result = await getCurrentUser();
            // setUser(result);
            // setIsLogged(true);

            Alert.alert("Success", "User signed in successfully");
            // router.replace("/home");

        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle email change and validate
    const handleEmailChange = (value) => {
        setForm({ ...form, email: value });
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
                    {/* Display the logo */}
                    <Image
                        source={images.logo} // Logo image source
                        resizeMode='contain' // Ensures the image fits within the container
                        className="w-[115px] h=[35px]" // Styling for image size
                    />
                    {/* Title for the login screen */}
                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Log in to Aora
                    </Text>
                    {/* Email input field */}
                    <FormField
                        title="Email" // Label for the input field
                        value={form.email} // Current email value from state
                        // handleChangeText={(e) => setForm({ ...form, email: e })} // Updates email in state
                        handleChangeText={handleEmailChange} // Updates the email in state with validation
                        error={emailError}
                        otherStyles="mt-7" // Additional margin styling
                        keyboardType="email-address" // Ensures appropriate keyboard type for email input
                    />
                    {/* Password input field */}
                    <FormField
                        title="Password" // Label for the input field
                        value={form.password} // Current password value from state
                        handleChangeText={(e) => setForm({ ...form, password: e })} // Updates password in state
                        otherStyles="mt-7" // Additional margin styling
                    />
                    {/* Submit button */}
                    <CustomButton
                        title="Sign In" // Button text
                        handlePress={submit} // Calls the submit function on press
                        containerStyles="mt-7" // Styling for button container
                        isLoading={isSubmitting} // Shows a loading indicator if the form is submitting
                    />
                    {/* Navigation link to sign-up screen */}
                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link
                            href="/sign-up" // Navigates to the sign-up screen
                            className="text-lg font-psemibold text-secondary"
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
