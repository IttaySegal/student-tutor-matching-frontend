// Import necessary modules and components
import { useEffect } from "react"; // useEffect hook for side-effects management
import { useFonts } from "expo-font"; // Custom hook for loading fonts from assets
import { SplashScreen, Stack } from "expo-router"; // SplashScreen for initial screen and Stack for navigation
import "../global.css"; // Global styles (CSS) for the application

// Prevents the splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // Load custom fonts using the useFonts hook
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"), // Custom font: Poppins Black
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"), // Custom font: Poppins Bold
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"), // Custom font: Poppins ExtraBold
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"), // Custom font: Poppins ExtraLight
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"), // Custom font: Poppins Light
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"), // Custom font: Poppins Medium
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"), // Custom font: Poppins Regular
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"), // Custom font: Poppins SemiBold
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"), // Custom font: Poppins Thin
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
    <Stack>
      {/* Define the root screen (index) with no header */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Define the authentication screens (auth) with no header */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

// Export the RootLayout component for use in the app
export default RootLayout;
