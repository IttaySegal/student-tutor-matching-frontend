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
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list"; // ייבוא SelectList
import Ionicons from "react-native-vector-icons/Ionicons"; // ייבוא אייקונים
import RTLText from "./RTLText"; // RTLText לעברית

const SelectField = ({ label, selectedValue, onValueChange, options }) => {
  const sharedStyles = {
    boxStyles: {
      backgroundColor: "#fff",
      borderRadius: 8,
      flexDirection: "row-reverse", // כיוון RTL
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputStyles: { textAlign: "right", fontSize: 16 },
    dropdownStyles: { backgroundColor: "#fff" },
    dropdownTextStyles: { textAlign: "right", fontSize: 16 },
    arrowicon: <Ionicons name="chevron-down-outline" size={20} color="gray" />, // אייקון של חץ
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {/* כותרת */}
      <RTLText>{label}</RTLText>

      {/* DropDown */}
      <SelectList
        setSelected={onValueChange} // פעולה לעדכון ערך הנבחר
        data={options} // נתונים לאופציות
        placeholder="בחר..." // פלייסהולדר
        defaultOption={{ key: selectedValue, value: selectedValue }} // ערך ברירת מחדל
        {...sharedStyles} // משתף סטיילים בין כל השדות
      />
    </View>
  );
};

export default SelectField;
