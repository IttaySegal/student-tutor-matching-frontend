import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput } from "react-native";
import { fetchMentors } from "@/services/adminService";
import PageHeader from "@/components/PageHeader";
import MentorCard from "@/components/MentorCard";
import MentorOverviewModal from "@/components/MentorOverviewModal";

export default function MyMentors() {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const data = await fetchMentors();
        const cleanedData = data.map((mentor) => ({
          ...mentor,
          fullName: mentor.fullName || "Unnamed Mentor",
          averageScore: typeof mentor.averageScore === "number" ? mentor.averageScore : 0,
          totalCompletedLessons: mentor.totalCompletedLessons || 0,
        }));
        setMentors(cleanedData);
        setFilteredMentors(cleanedData);
      } catch (err) {
        console.error("Error fetching mentors", err);
      } finally {
        setLoading(false);
      }
    };

    loadMentors();
  }, []);

  // Search logic
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = mentors.filter((mentor) =>
      (mentor.fullName || "").toLowerCase().includes(query)
    );
    setFilteredMentors(filtered);
  }, [searchQuery, mentors]);

  return (
    <View className="flex-1 bg-primary px-5 py-6">
      <Text className="text-2xl font-bold text-white mb-6 text-center">
        My Mentors
      </Text>
      <TextInput
        placeholder="Search mentor by name"
        placeholderTextColor="#9CA3AF"
        className="bg-gray-800 text-white rounded-lg px-4 py-3 mb-4 border border-gray-700"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={filteredMentors}
          keyExtractor={(item, index) => item.mentorId || index.toString()}
          renderItem={({ item }) => (
            <MentorCard
              fullName={item.fullName}
              email={item.mentorEmail}
              averageScore={item.averageScore}
              totalCompletedLessons={item.totalCompletedLessons}
              onPress={() => setSelectedMentor(item)}
            />
          )}
          ListEmptyComponent={
            <Text className="text-white text-center mt-10">No mentors found.</Text>
          }
        />
      )}

      <MentorOverviewModal
        visible={!!selectedMentor}
        mentor={selectedMentor}
        onClose={() => setSelectedMentor(null)}
      />
    </View>
  );
}
