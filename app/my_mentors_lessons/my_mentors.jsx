import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput } from "react-native";
import { fetchMentors } from "@/services/adminService";
import PageHeader from "@/components/PageHeader";
import MentorCard from "@/components/MentorCard";
import MentorOverviewModal from "@/components/MentorOverviewModal";

export default function MyMentors() {
  // State for all mentors fetched from the backend
  const [mentors, setMentors] = useState([]);
  // State for mentors filtered by search query
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    // Fetch mentors from the backend when the component mounts
    const loadMentors = async () => {
      try {
        const response = await fetchMentors();
        console.log("Raw mentor response:", response);

        // The response is expected to be an array of mentor objects
        const mentorsArray = response || []; // fallback to empty array if response is falsy

        console.log("Extracted mentor list:", mentorsArray);

        // Clean and normalize mentor data for consistent rendering
        const cleanedData = mentorsArray.map((mentor) => ({
          ...mentor,
          fullName: mentor.mentorName || "Unnamed Mentor",
          averageScore: mentor.averageScore ?? 0,
          totalCompletedLessons: mentor.totalCompletedLessons ?? 0,
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

  // Filter mentors whenever the search query or mentor list changes
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
      {/* Search input for filtering mentors by name */}
      <TextInput
        placeholder="Search mentor by name"
        placeholderTextColor="#9CA3AF"
        className="bg-gray-800 text-white rounded-lg px-4 py-3 mb-4 border border-gray-700"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        // Show loading spinner while mentors are being fetched
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        // Display the list of mentors (filtered by search)
        <FlatList
          data={filteredMentors}
          keyExtractor={(item, index) => item.mentorId?.toString() || index.toString()}
          renderItem={({ item }) => (
            <MentorCard
              fullName={item.fullName}
              email={item.mentorEmail}
              averageScore={item.averageScore}
              totalCompletedLessons={item.totalCompletedLessons}
              onPress={() => setSelectedMentor(item)} // Open modal on card press
            />
          )}
          ListEmptyComponent={
            <Text className="text-white text-center mt-10">No mentors found.</Text>
          }
        />
      )}

      {/* Modal to show detailed mentor overview */}
      <MentorOverviewModal
        visible={!!selectedMentor}
        mentor={selectedMentor}
        onClose={() => setSelectedMentor(null)}
      />
    </View>
  );
}
