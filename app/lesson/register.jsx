import { useEffect } from "react";
import { router } from "expo-router";

export default function RegisterLessonRedirect() {
  useEffect(() => {
    router.replace("/(tabs)/create");
  }, []);

  return null;
} 