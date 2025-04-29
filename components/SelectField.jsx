import React from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Ionicons from "react-native-vector-icons/Ionicons";

const SelectField = ({
  label,
  selectedValue,
  onValueChange,
  options,
  multiple = false,
}) => {
  const sharedStyles = {
    boxStyles: {
      backgroundColor: "#fff",
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    inputStyles: {
      textAlign: "left",
      fontSize: 16,
      color: "#000",
    },
    dropdownStyles: {
      backgroundColor: "#fff",
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
    },
    dropdownTextStyles: {
      textAlign: "left",
      fontSize: 16,
      color: "#000",
    },
    arrowicon: <Ionicons name="chevron-down-outline" size={20} color="gray" />,
    searchPlaceholder: "Search...",
    searchStyles: {
      textAlign: "left",
      fontSize: 16,
    },
  };

  return (
    <View style={{ marginBottom: 20, width: "100%" }}>
      {label && (
        <Text
          style={{
            textAlign: "left",
            marginBottom: 10,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {label}
        </Text>
      )}
      <SelectList
        setSelected={onValueChange}
        data={options}
        placeholder="Select..."
        defaultOption={
          selectedValue ? { key: selectedValue, value: selectedValue } : null
        }
        multiple={multiple}
        {...sharedStyles}
      />
    </View>
  );
};

export default SelectField;
