import { View, Text } from "react-native";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "./CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { subjectsWithGroups, subjects, grades } from "../constants/searchlessonFilters";

const SearchBar = ({ onSearch }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleSearch = () => {
    onSearch({
      subject: selectedSubject,
      grade: selectedGrade,
      group: selectedGroup || "General",
    });
  };

  const groupOptions = subjectsWithGroups[selectedSubject] || [];

  const sharedStyles = {
    boxStyles: {
      backgroundColor: "#fff",
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputStyles: { textAlign: "left", fontSize: 16 },
    dropdownStyles: { backgroundColor: "#fff" },
    dropdownTextStyles: { textAlign: "left", fontSize: 16 },
    arrowicon: <Ionicons name="chevron-down-outline" size={20} color="gray" />,
  };

  return (
    <View className="w-full gap-4 mb-4 px-2">
      <Text className="text-white font-bold text-lg">
        Filter Lessons
      </Text>

      {/* Subject */}
      <SelectList
        setSelected={setSelectedSubject}
        data={subjects.map((s) => ({ key: s.value, value: s.value }))}
        placeholder="Select Subject"
        {...sharedStyles}
      />

      {/* Grade */}
      <SelectList
        setSelected={setSelectedGrade}
        data={grades}
        placeholder="Select Grade"
        {...sharedStyles}
      />

      {/* Group */}
      {groupOptions.length > 0 ? (
        <SelectList
          setSelected={setSelectedGroup}
          data={groupOptions.map((g) => ({ key: g, value: g }))}
          placeholder="Select Group"
          {...sharedStyles}
        />
      ) : (
        <Text className="text-white text-base mt-1">
          Group: General
        </Text>
      )}

      {/* Button */}
      <CustomButton
        title="Search Lessons"
        handlePress={handleSearch}
        containerStyles="w-full mt-4"
      />
    </View>
  );
};

export default SearchBar;
