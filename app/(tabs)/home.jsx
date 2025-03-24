import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // adjust if needed
import { router } from 'expo-router';

const Home = () => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/sign-in'); // Redirect to login if not authenticated
    }
  }, [loading, isAuthenticated]);

  if (loading || !isAuthenticated) return null;

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;