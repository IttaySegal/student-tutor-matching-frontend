import React from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select"; // ייבוא של picker מ-`react-native-picker-select`
import RTLText from "./RTLText";

const SelectField = ({ label, selectedValue, onValueChange, options }) => (
  <View style={{ marginBottom: 20 }}>
    <RTLText>{label}</RTLText>
    <RNPickerSelect
      onValueChange={onValueChange} // עדכון ערך הבחירה
      items={options} // רשימת האופציות לבחירה
      value={selectedValue} // הערך הנבחר
      placeholder={{ label: "בחר...", value: null }} // Placeholder שמופיע אם לא נבחר ערך
    />
  </View>
);

export default SelectField;

// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { Select, SelectItem, Layout } from "@ui-kitten/components";
// import RTLText from "./RTLText"; // לוודא שיש לך את RTLText כמו קודם

// const SelectField = ({ label, selectedValue, onValueChange, options }) => (
//   <View style={{ marginBottom: 20 }}>
//     <RTLText>{label}</RTLText>
//     <Layout level="1">
//       <Select
//         selectedIndex={selectedValue} // הערך הנבחר
//         onSelect={(index) => onValueChange(options[index.row].value)} // עדכון ערך הבחירה
//       >
//         {options.map((option, index) => (
//           <SelectItem key={index} title={option.value} />
//         ))}
//       </Select>
//     </Layout>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     minHeight: 128,
//   },
// });

// export default SelectField;
