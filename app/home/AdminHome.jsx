import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLesson } from "../../context/LessonContext";
import RTLText from "../../components/RTLText";
import { getGreeting } from "./utils/timeUtils";
import RequestCard from "../../components/RequestCard";
import RequestModal from "../../components/RequestModal";

const AdminHome = () => {
  const { lessonStats, fetchLessonStats } = useLesson();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!lessonStats) {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) await fetchLessonStats(token);
      }
    }; 

    loadData();
  }, []);

  const handleRequestPress = (request) => {
    setSelectedRequest(request);
    setModalVisible(true);
  };

  const handleApprove = () => {
    console.log("✅ אושר:", selectedRequest);
    setModalVisible(false);
  };

  const handleReject = () => {
    console.log("❌ נחסם:", selectedRequest);
    setModalVisible(false);
  };

  if (!lessonStats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <RTLText style={{ marginTop: 10 }}>טוען מידע...</RTLText>
      </View>
    );
  }

  const greeting = getGreeting();
  const pendingRequests = lessonStats.pendingRequests || [];

  return (
    <View style={[styles.container, { paddingTop: 40 }]}>
      <RTLText style={styles.title}>{greeting}, מנהל/ת יקר/ה</RTLText>

      {/* ממוצע דירוג חונכים */}
      <RTLText style={styles.section}>
        ⭐ ממוצע דירוג חונכים: {lessonStats.mentorAvgScore} מתוך 5
      </RTLText>

      {/* בקשות ממתינות */}
      <RTLText style={styles.section}>📥 בקשות ממתינות:</RTLText>

      {pendingRequests.length === 0 ? (
        <RTLText>אין בקשות חדשות כרגע.</RTLText>
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
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
  },
  section: {
    fontSize: 18,
    marginTop: 30,
    textAlign: "right",
    fontWeight: "bold",
  },
});

export default AdminHome;
