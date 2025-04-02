import { View, ScrollView, Text } from "react-native";
import SearchBar from "../components/SearchBar";

const TestSearch = () => {
  const handleSearch = ({ subject, grade, group }) => {
    console.log("🔍 חיפוש שבוצע:");
    console.log("מקצוע:", subject);
    console.log("כיתה:", grade);
    console.log("הקבצה:", group);
  };

  return (
    <ScrollView className="flex-1 bg-primary px-4 pt-10">
      <SearchBar onSearch={handleSearch} />
    </ScrollView>
  );
};

export default TestSearch;
