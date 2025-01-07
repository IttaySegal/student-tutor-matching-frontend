// Import necessary components from React Native
import { ActivityIndicator, Text, TouchableOpacity } from "react-native"; // ActivityIndicator for loading spinner, Text for button text, TouchableOpacity for clickable button

// Define the CustomButton component
const CustomButton = ({
    title, // Title of the button, passed as a prop
    handlePress, // Function to execute when the button is pressed
    containerStyles, // Additional styles for the button container
    textStyles, // Additional styles for the text inside the button
    isLoading, // Boolean to control whether the button shows a loading spinner
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress} // Attach the press handler to the button
            activeOpacity={0.7} // Set opacity when the button is pressed (for visual feedback)
            className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`} // Style for the button container (dynamic classes based on props)
            disabled={isLoading} // Disable the button when it's in the loading state
        >
            {/* Button title (text) */}
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
                {title} {/* The title passed as prop will be displayed here */}
            </Text>

            {/* Show loading spinner if isLoading is true */}
            {isLoading && (
                <ActivityIndicator
                    animating={isLoading} // Activates the loading spinner
                    color="#fff" // Spinner color (white)
                    size="small" // Spinner size (small)
                    className="ml-2" // Add margin-left to separate the spinner from the text
                />
            )}
        </TouchableOpacity>
    );
};

// Export the CustomButton component for use in other parts of the application
export default CustomButton;
