// Import necessary modules and components
import { useEffect } from "react"; // useEffect hook for side-effects management
import { useFonts } from "expo-font"; // Custom hook for loading fonts from assets
import { SplashScreen, Stack } from "expo-router"; // SplashScreen for initial screen and Stack for navigation
import "../global.css"; // Global styles (CSS) for the application
import { SafeAreaView } from "react-native-safe-area-context";

// Prevents the splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // Load custom fonts using the useFonts hook
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  // useEffect hook to manage side effects, like hiding the splash screen after fonts are loaded
  useEffect(() => {
    // If there's an error loading fonts, throw the error
    if (error) throw error;

    // If fonts are loaded successfully, hide the splash screen
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]); // Dependency array ensures the effect runs when fontsLoaded or error changes

  // Return null if fonts are not loaded yet to prevent rendering incomplete UI
  if (!fontsLoaded) {
    return null;
  }

  // Return null if fonts are not loaded and no error occurred (redundant check, but keeps flow)
  if (!fontsLoaded && !error) {
    return null;
  }

  // Render the Stack navigator for app's layout
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Stack>
        {/* Define the root screen (index) with no header */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* Define the authentication screens (auth) with no header */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
};

// Export the RootLayout component for use in the app
export default RootLayout;
