import { useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator, Text } from "react-native";
import StudentPendings from "@review/StudentPendings";
import MentorPendings from "@review/MentorPendings";
import AdminPendings from "@review/AdminPendings";

export default function PendingsScreen() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  if (!user || !user.role) return null;


  switch (user?.role) {
    case "student":
      return <StudentPendings />;
    case "mentor":
      return <MentorPendings />;
    case "admin":
      return <AdminPendings />;
    default:
      return <Text>Unrecognized role</Text>;
  }
}
