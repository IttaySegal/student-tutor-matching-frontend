// import React from "react";
// import { View, Text } from "react-native";
// import RNPickerSelect from "react-native-picker-select"; // ייבוא של picker מ-`react-native-picker-select`
// import RTLText from "./RTLText";

// const SelectField = ({ label, selectedValue, onValueChange, options }) => (
//   <View style={{ marginBottom: 20 }}>
//     <RTLText>{label}</RTLText>
//     <RNPickerSelect
//       onValueChange={onValueChange} // עדכון ערך הבחירה
//       items={options} // רשימת האופציות לבחירה
//       value={selectedValue} // הערך הנבחר
//       placeholder={{ label: "בחר...", value: null }} // Placeholder שמופיע אם לא נבחר ערך
//     />
//   </View>
// );

// export default SelectField;

import React from "react";
import { View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Ionicons from "react-native-vector-icons/Ionicons";
import RTLText from "./RTLText";

const SelectField = ({ label, selectedValue, onValueChange, options, multiple = false }) => {
  const sharedStyles = {
    boxStyles: {
      backgroundColor: "#fff",
      borderRadius: 8,
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    inputStyles: { 
      textAlign: "right", 
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
      textAlign: "right", 
      fontSize: 16,
      color: "#000",
    },
    arrowicon: <Ionicons name="chevron-down-outline" size={20} color="gray" />,
    searchPlaceholder: "חיפוש...",
    searchStyles: {
      textAlign: "right",
      fontSize: 16,
    },
  };

  return (
    <View style={{ marginBottom: 20, width: "100%" }}>
      {label && <RTLText style={{ textAlign: "right", marginBottom: 10, fontWeight: "bold" }}>{label}</RTLText>}
      <SelectList
        setSelected={onValueChange}
        data={options}
        placeholder="בחר..."
        defaultOption={selectedValue ? { key: selectedValue, value: selectedValue } : null}
        multiple={multiple}
        {...sharedStyles}
      />
    </View>
  );
};

export default SelectField;
