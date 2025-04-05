import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const CreateRouter = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.role) return;

    switch (user.role) {
      case "mentor":
        router.replace("/create/CreateLesson");
        break;
      case "student":
        router.replace("/create/RegisterLesson");
        break;
      case "admin":
        router.replace("/create/CreateReport");
        break;
      default:
        console.warn("⚠️ Unknown role:", user.role);
        break;
    }
  }, [user]);

  return null; // אפשר גם להחזיר spinner אם תרצה
};

export default CreateRouter;
