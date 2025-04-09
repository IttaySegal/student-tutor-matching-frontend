import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { Slot } from "expo-router"; // ✅ חובה בשביל ניווט דינמי
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { I18nManager } from "react-native"; // הוספת I18nManager
//import { AuthProvider } from "../context/AuthContext";
import GlobalProvider from "../context/GlobalProvider";

// הגדרת RTL גלובלית
I18nManager.forceRTL(true);

// Keep splash screen visible until ready
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
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

  // Stable callback ensuring UI layout is ready before hiding splash screen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }

    // Log or handle font errors explicitly
    if (fontError) {
      console.error("Font loading error:", fontError);
      await SplashScreen.hideAsync(); // still hide the splash, or handle differently
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GlobalProvider>
      <SafeAreaView className="flex-1 bg-primary" onLayout={onLayoutRootView}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </GlobalProvider>
  );
};

export default RootLayout;
