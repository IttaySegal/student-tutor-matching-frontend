import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { Slot } from "expo-router"; // ✅ חובה בשביל ניווט דינמי
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { I18nManager } from "react-native"; // הוספת I18nManager
import { AuthProvider } from "@/context/AuthContext";
import GlobalProvider from "@/context/GlobalProvider";
import { useAuth } from "@/context/AuthContext";
import { Tabs } from "expo-router";
import { icons } from "@/constants";
import { View, Text, Image, Dimensions } from "react-native";

// הגדרת RTL גלובלית
I18nManager.forceRTL(true);

// Get the screen width for responsive styling
const { width } = Dimensions.get('window');

// Component for rendering individual tab icons and labels
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2 top-4" style={{ minWidth: 100 }} >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
        style={{ marginTop: 20 }}
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xm`}
        style={{
          color: color,
          fontSize: width > 500 ? 12 : 9,
        }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  )
}

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
    <AuthProvider>
      <GlobalProvider>
        <SafeAreaView className="flex-1 bg-primary" onLayout={onLayoutRootView}>
          <Slot />
        </SafeAreaView>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default RootLayout;
