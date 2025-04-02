import { Text } from "react-native";

const RTLText = ({ children, style, ...props }) => {
  return (
    <Text
      style={[{ textAlign: "right", writingDirection: "rtl" }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default RTLText;
