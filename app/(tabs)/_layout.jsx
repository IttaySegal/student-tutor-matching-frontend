import { View, Text, Image, Dimensions } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { router } from 'expo-router';

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

// Main layout for the tab navigation
const TabsLayout = () => {
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace('/');
        }
    }, [loading, isAuthenticated]);

    if (loading || !isAuthenticated) return null;

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84,
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: 'My Lessons',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.bookmark}
                                color={color}
                                name="My Lessons"
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.plus}
                                color={color}
                                name="Create"
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                name="Profile"
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout
