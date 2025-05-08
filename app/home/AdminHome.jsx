import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHome } from "@context/HomeContext";
import { useAuth } from "@context/AuthContext";
import { getGreeting } from "../../utils/timeUtils";
import RequestCard from "../../components/RequestCard";
import RequestModal from "../../components/RequestModal";

const AdminHome = () => {
  const { user, loading } = useAuth();
  const { homeStats, fetchHomeStats } = useHome();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const tryFetchStats = async () => {
        if (!user || loading) return;
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          console.log("👩‍💼 AdminHome → valid token, fetching home stats");
          fetchHomeStats();
        } else {
          console.log("🛑 AdminHome → no token found, skipping fetch");
        }
      };

      tryFetchStats();
    }, [user, loading])
  );

  const handleRequestPress = (request) => {
    setSelectedRequest(request);
    setModalVisible(true);
  };

  const handleApprove = () => {
    console.log("✅ Approved:", selectedRequest);
    setModalVisible(false);
  };

  const handleReject = () => {
    console.log("❌ Rejected:", selectedRequest);
    setModalVisible(false);
  };

  if (!homeStats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading information...</Text>
      </View>
    );
  }

  const greeting = getGreeting();
  const pendingRequests = homeStats.pendingRequests || [];

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>{greeting}, {user.first_name} {user.last_name}</Text>
      <Text style={styles.subText}>Here's an overview of requests and mentor stats.</Text>

      {/* Mentor Rating */}
      <Text style={styles.sectionTitle}>Mentor Rating:</Text>
      <Text style={styles.cardText}>
        ⭐{homeStats.mentorAvgScore}/5
      </Text>

      {/* Requests */}
      <Text style={styles.sectionTitle}>📥 Pending Requests</Text>
      {pendingRequests.length === 0 ? (
        <Text style={styles.emptyText}>No new requests at the moment.</Text>
      ) : (
        pendingRequests.map((req, index) => (
          <RequestCard key={index} {...req} onPress={() => handleRequestPress(req)} />
        ))
      )}

      <RequestModal
        visible={modalVisible}
        request={selectedRequest}
        onClose={() => setModalVisible(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622", // כמו StudentHome
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 24,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 18,
    color: "#eee",
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#aaa",
    fontStyle: "italic",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#aaa",
  },
});

export default AdminHome;
