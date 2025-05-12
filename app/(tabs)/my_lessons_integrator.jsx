import MyLessonSscreen from "../my_mentors_lessons/my_lessons";
import MyMentorsScreen from "../my_mentors_lessons/my_mentors"; 
import { useAuth } from "@/context/AuthContext";
import { Text } from "react-native";


export default function MyLessonsIntegrator() {
  const { user } = useAuth();

  if (!user || !user.role) return null;

  switch (user.role) {
    case "admin":
      return <MyMentorsScreen />;
    case "mentor":
    case "student":
      return <MyLessonSscreen />;
    default:
      return <Text className="text-white text-center">Unrecognized role</Text>;
  }
}
