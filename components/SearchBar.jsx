import { View, Text } from "react-native";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "./CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons"; // ✅ ייבוא אייקונים
import { subjectsWithGroups, subjects, grades } from "../constants/searchlessonFilters";

const SearchBar = ({ onSearch }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleSearch = () => {
    onSearch({
      subject: selectedSubject,
      grade: selectedGrade,
      group: selectedGroup || "כללי",
    });
  };

  const groupOptions = subjectsWithGroups[selectedSubject] || [];

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
    arrowicon: <Ionicons name="chevron-down-outline" size={20} color="gray" />,
  };

  return (
    <View className="w-full gap-4 mb-4 px-2">
      <Text className="text-white text-right font-bold text-lg">
        סינון שיעורים
      </Text>

      {/* מקצוע */}
      <SelectList
        setSelected={setSelectedSubject}
        data={subjects.map((s) => ({ key: s.value, value: s.value }))}
        placeholder="בחר מקצוע"
        {...sharedStyles}
      />

      {/* כיתה */}
      <SelectList
        setSelected={setSelectedGrade}
        data={grades}
        placeholder="בחר כיתה"
        {...sharedStyles}
      />

      {/* הקבצה */}
      {groupOptions.length > 0 ? (
        <SelectList
          setSelected={setSelectedGroup}
          data={groupOptions.map((g) => ({ key: g, value: g }))}
          placeholder="בחר הקבצה"
          {...sharedStyles}
        />
      ) : (
        <Text className="text-white text-right text-base mt-1">
          הקבצה: כללי
        </Text>
      )}

      {/* כפתור */}
      <CustomButton
        title="חפש שיעורים"
        handlePress={handleSearch}
        containerStyles="w-full mt-4"
      />
    </View>
  );
};

export default SearchBar;
