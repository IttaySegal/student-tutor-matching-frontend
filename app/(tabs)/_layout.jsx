import { View, Text, Image, Dimensions } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants';
import { useAuth } from '../../context/AuthContext'; // adjust if needed
import { useEffect } from 'react';
import { router } from 'expo-router';

// Get the screen width for responsive styling
const { width } = Dimensions.get('window');

// Component for rendering individual tab icons and labels
const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="flex items-center justify-center gap-2 top-4" style={{ minWidth: 100 }} >
            <Image
                source={icon} // Icon source
                resizeMode="contain" // Keep aspect ratio
                tintColor={color} // Set icon color based on active/inactive state
                className="w-6 h-6"
                style={{ marginTop: 20 }} // Adjust icon alignment
            />
            <Text
                className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xm`}
                style={{
                    color: color, // Text color matches the icon color
                    fontSize: width > 500 ? 12 : 9,// Responsive font size
                }}
                numberOfLines={1} // Prevent text from wrapping
            >
                {name} {/* Display the name of the tab */}
            </Text>
        </View>
    )
}

// Main layout for the tab navigation
const TabsLayout = () => {
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace('/sign-in');
        }
    }, [loading, isAuthenticated]);

    if (loading || !isAuthenticated) return null;

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false, // Hide default tab labels
                    tabBarActiveTintColor: '#FFA001', // Color for active tab
                    tabBarInactiveTintColor: '#CDCDE0', // Color for inactive tabs
                    tabBarStyle: {
                        backgroundColor: '#161622', // Tab bar background color
                        borderTopWidth: 1, // Top border width
                        borderTopColor: '#232533', // Top border color
                        height: 84, // Set the height of the tab bar
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
                                icon={icons.home} // Icon for the Home tab
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        )
                    }}
                />
                {/* Each screen represents a tab */}
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: 'Bookmark', // Title for the tab
                        headerShown: false, // Hide the screen header
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.bookmark} // Icon for the Bookmark tab
                                color={color}
                                name="Bookmark"
                                focused={focused} // Highlight based on active state
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
                                icon={icons.plus} // Icon for the Create tab
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
                                icon={icons.profile} // Icon for the Profile tab
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
