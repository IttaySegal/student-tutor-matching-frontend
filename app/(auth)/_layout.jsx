// Import necessary modules and components
import { View, Text } from 'react-native'; // React Native components for layout (not used in this file)
import React from 'react'; // React library for building user interfaces
import { Stack } from 'expo-router'; // Stack navigator from Expo Router for managing screen navigation
import { StatusBar } from 'expo-status-bar'; // Provides a customizable status bar for the app

// Define the AuthLayout component
const AuthLayout = () => {
    return (
        <>
            {/* Stack Navigator to manage authentication-related screens */}
            <Stack>
                {/* Stack screen for the Sign-In page */}
                <Stack.Screen
                    name="sign-in" // Route name for the sign-in screen
                    options={{
                        headerShown: false // Disables the header for this screen
                    }}
                />
                {/* Stack screen for the Sign-Up page */}
                <Stack.Screen
                    name="sign-up" // Route name for the sign-up screen
                    options={{
                        headerShown: false // Disables the header for this screen
                    }}
                />
            </Stack>

            {/* Status bar styling for the layout */}
            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
};

// Export the AuthLayout component for use in the app
export default AuthLayout;
