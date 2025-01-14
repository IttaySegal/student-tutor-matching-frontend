// Import necessary modules and components
import { View, Text, ScrollView, Image, Alert, ImageComponent } from 'react-native'; // Core React Native components for layout and styling
import React, { useState } from 'react'; // React and useState hook for managing state
import { SafeAreaView } from 'react-native-safe-area-context'; // Ensures content stays within safe area boundaries
import { images } from '../../constants'; // Import image assets from a centralized constants file
import FormField from '../../components/FormField'; // Custom input field component for reusable forms
import CustomButton from '../../components/CustomButton'; // Custom button component for actions
import { Link, useRouter } from 'expo-router'; // Navigation component for routing between screens
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { registerUser } from '../../services/authService';


// Validate first name and last name
const validateName = (name) => {
    const regex = /^[A-Za-z]+$/; // Only allows letters (no numbers or special characters)
    if (!regex.test(name)) {
        return 'Name must only contain letters';
    }
    if (name.length > 20) {
        return 'Name must be no longer than 20 characters';
    }
    return ''; // No error if valid
};


// Define the SignUp component
const SignUp = () => {
    // State to manage form inputs
    const router = useRouter();
    const [form, setForm] = useState({
        // username: '', // Stores the username entered by the user
        firstName: '', // Stores the firstname entered by the user
        lastName: '', // Stores the lastname entered by the user
        email: '', // Stores the email entered by the user
        password: '' // Stores the password entered by the user
    });

    // States for validation errors
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    // State to manage submission status (e.g., showing a loading indicator)
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Function to handle form submission
    const submit = async () => {
        if (form.firstName === "" || form.lastName === "" || form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
        }

        // Validate first and last names
        const firstNameValidationError = validateName(form.firstName);
        const lastNameValidationError = validateName(form.lastName);

        if (firstNameValidationError) {
            setFirstNameError(firstNameValidationError);
            return; // Stop submission if there's an error in the first name
        } else {
            setFirstNameError('');
        }

        if (lastNameValidationError) {
            setLastNameError(lastNameValidationError);
            return; // Stop submission if there's an error in the last name
        } else {
            setLastNameError('');
        }

        if (emailError || passwordError) {
            Alert.alert("Error", "Please fix the errors before submitting");
            return;
        }

        setIsSubmitting(true);
        try {
            // setIsSubmitting(true); // check if works in or out of the try
            const data = await registerUser({
                // username: form.username,
                first_name: form.firstName,
                last_name: form.lastName,
                email: form.email,
                // country: form.country,
                password: form.password,
            });
            alert('Registration successful!');
            console.log('Server Response:', data);
            // const result = await createUser(form.firstName, form.lastName, form.email, form.password); // dummy for validation
            //   setUser(result);
            //   setIsLogged(true);
            router.push('/sign-in'); // check later if works better than replace
            // router.replace("/sign-in");
        } catch (error) {
          console.error('Registration Failed:', error.response?.data || error.message);
          Alert.alert(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
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


    // Handle password change and validate
    const handlePasswordChange = (value) => {
        setForm({ ...form, password: value });
        if (!isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })) {
            setPasswordError(
                "Password must be at least 8 characters, with at least 1 uppercase letter, 1 lowercase letter, and 1 number"
            );
        } else {
            setPasswordError('');
        }
    };

    // Handle changes for name inputs and validate
    const handleNameChange = (field, value) => {
        setForm({ ...form, [field]: value });
        const validationError = validateName(value);
        if (field === 'firstName') {
            setFirstNameError(validationError || ''); // Set first name error
        } else if (field === 'lastName') {
            setLastNameError(validationError || ''); // Set last name error
        }
    };

    return (
        // SafeAreaView to ensure the content fits within the device's safe area
        <SafeAreaView className="bg-primary h-full">
            {/* ScrollView to allow scrolling for content that exceeds the screen height */}
            <ScrollView>
                <View className="w-full justify-center min-h-[83vh] px-4 my-6">
                    {/* Display the app's logo */}
                    <Image
                        source={images.newLogoBig} // Logo image source from the constants file
                        resizeMode='contain' // Ensures the image fits properly within its container
                        className="w-[136px] h-[80px]" // Styling for the image dimensions
                    />
                    {/* Title for the sign-up screen */}
                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Sign up to Tutor
                    </Text>


                    {/* First Name and Last Name in the same row */}
                    <View className="flex flex-row justify-between gap-4 mt-10">
                        {/* First Name input field */}
                        <FormField
                            title="First Name"
                            value={form.firstName}
                            handleChangeText={(e) => handleNameChange('firstName', e)} // Name validation handler
                            error={firstNameError}  // Validation error for first name
                            otherStyles="flex-1"
                        />

                        {/* Last Name input field */}
                        <FormField
                            title="Last Name"
                            value={form.lastName}
                            handleChangeText={(e) => handleNameChange('lastName', e)} // Name validation handler
                            error={lastNameError}  // Validation error for last name
                            otherStyles="flex-1"
                        />
                    </View>


                    {/* Input field for the email */}
                    <FormField
                        title="Email" // Label for the input field
                        value={form.email} // Current value of the email from state
                        // handleChangeText={(e) => setForm({ ...form, email: e })} // Updates the email in state
                        handleChangeText={handleEmailChange} // Updates the email in state with validation
                        error={emailError}
                        otherStyles="mt-7" // Additional styling for margin
                        keyboardType="email-address" // Ensures appropriate keyboard for email input
                    />

                    {/* Input field for the password */}
                    <FormField
                        title="Password" // Label for the input field
                        value={form.password} // Current value of the password from state
                        // handleChangeText={(e) => setForm({ ...form, password: e })} // Updates the password in state
                        handleChangeText={handlePasswordChange} // Validates and updates the password in state
                        error={passwordError} // Passes the validation error message for password
                        otherStyles="mt-7" // Additional styling for margin
                    />

                    {/* Button for submitting the sign-up form */}
                    <CustomButton
                        title="Sign Up" // Button text
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
