import { View, Text } from 'react-native'; // React Native components for layout (not used in this file)
import React from 'react'; // React library for building user interfaces
import { Stack } from 'expo-router'; // Stack navigator from Expo Router for managing screen navigation
import { StatusBar } from 'expo-status-bar'; // Provides a customizable status bar for the app
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext'; // adjust if needed
import { useEffect } from 'react';
import { router } from 'expo-router';
// Define the AuthLayout component
const AuthLayout = () => {

    const { isAuthenticated, loading } = useAuth();
    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.replace('/(tabs)/home');
        }
    }, [loading, isAuthenticated]);

    return (
        <>
            <SafeAreaView className="flex-1 bg-primary">
                {/* Stack Navigator to manage authentication-related screens */}
                <Stack>
                    {/* Stack screen for the Sign-In page */}
                    <Stack.Screen
                        name="sign-in" // Route name for the sign-in screen
                        options={{
                            headerShown: false, // Disables the header for this screen
                        }}
                    />
                    {/* Stack screen for the Sign-Up page */}
                    <Stack.Screen
                        name="sign-up" // Route name for the sign-up screen
                        options={{
                            headerShown: false // Disables the header for this screen
                        }}
                    />
                    {/* Stack screen for the Reset Password page */}
                    <Stack.Screen
                        name="reset-password" // Route name for the reset password screen
                        options={{
                            headerShown: false // Disables the header for this screen
                        }}
                    />
                    <Stack.Screen
                        name="verify-reset-code"
                        options={{ headerShown: false }} // 👈 ADD THIS
                    />
                    <Stack.Screen
                        name="change-password"
                        options={{ headerShown: false }} // 👈 AND THIS
                    />
                </Stack>

                {/* Status bar styling for the layout */}
                <StatusBar backgroundColor="#161622" style="light" />
            </SafeAreaView>

        </>
    );
};

// Export the AuthLayout component for use in the app
export default AuthLayout;
