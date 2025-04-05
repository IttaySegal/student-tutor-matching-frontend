import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';

import MentorHome from "../home/MentorHome";
import StudentHome from "../home/StudentHome";
import AdminHome from "../home/AdminHome";


export default function HomeRouter() {
  const { user, loading } = useAuth();


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!user || !user.role) return null;

  switch (user.role) {
    case 'mentor':
      return <MentorHome />;
    case 'student':
      return <StudentHome />;
    case 'admin':
      return <AdminHome />;
    default:
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>רול לא מזוהה</Text>
        </View>
      );
  }
}
