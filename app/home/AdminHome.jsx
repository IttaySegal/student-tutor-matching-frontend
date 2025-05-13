import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHome } from "@context/HomeContext";
import { useAuth } from "@context/AuthContext";
import { getGreeting } from "../../utils/timeUtils";
import RequestCard from "../../components/RequestCard";
import RequestModal from "../../components/RequestModal";
import PieChartView from "../../components/PieChartView";
import SubjectBreakdown from "../../components/SubjectBreakdown";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/FontAwesome";
const AdminHome = () => {
  const { user, loading } = useAuth();
  const {
    homeStats,
    fetchHomeStats,
    subjectBreakdown,
    selectedSubject,
    setSelectedSubject,
  } = useHome();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedViewSubject, setSelectedViewSubject] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const tryFetchStats = async () => {
        if (!user || loading) return;
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          console.log("\uD83D\uDC69‍\uD83D\uDCBC AdminHome → valid token, fetching home stats");
          fetchHomeStats(token);
        }
      };
      tryFetchStats();
    }, [user, loading])
  );

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
  const roundedRating = Math.round(Number(homeStats.overallMentorAvgScore) * 2) / 2;
  const allSubjects = [
    ...new Set(
      homeStats.lessonsnsGradeDistribution.map((item) => item.subjectName)
    ),
  ];

  const aggregatedSubjects = allSubjects.map((subject) => {
    const total = homeStats.lessonsnsGradeDistribution
      .filter((item) => item.subjectName === subject)
      .reduce((sum, entry) => sum + (Number(entry.count) || 0), 0);
    return { name: subject, count: total };
  });

  const filteredGrades = homeStats.lessonsnsGradeDistribution
    .filter((entry) => entry.subjectName === selectedViewSubject)
    .map((entry) => ({
      name: `Grade ${entry.grade}`,
      count: Number(entry.count) || 0,
    }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greetingText}>
        {greeting}, {user.first_name} {user.last_name}
      </Text>
      <Text style={styles.subText}>
        Here's an overview of requests and mentor stats.
      </Text>


      <View style={styles.starRow}>
        <Stars
          default={roundedRating}
          count={5}
          half={true}
          fullStar={<Icon name="star" size={24} color="#f1c40f" />}
          emptyStar={<Icon name="star-o" size={24} color="#f1c40f" />}
          halfStar={<Icon name="star-half-o" size={24} color="#f1c40f" />}
          disabled={true}
        />
        <Text style={styles.statLabel}>Mentors Average Rating: {homeStats.overallMentorAvgScore}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{homeStats.totalApprovedLessons}</Text>
          <Text style={styles.statLabel}>
            <Icon name="check-circle" size={12} color="#ccc" /> Total Approved Lessons</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{homeStats.averageLessonsPerMentor}</Text>
          <Text style={styles.statLabel}>
            <Icon name="users" size={12} color="#ccc" /> Avg Lessons per Mentor</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{homeStats.lessonsCreatedLastWeek}</Text>
          <Text style={styles.statLabel}>
            <Icon name="calendar-plus-o" size={12} color="#ccc" /> Lessons Created This Week</Text>
        </View>
      </View>

      {homeStats.role === "admin" && (
        <>
          <Text style={styles.sectionTitle}>📊 Lessons Distribution:</Text>

          <ScrollView horizontal style={{ marginBottom: 10 }}>
            <Button
              title="All Subjects"
              onPress={() => setSelectedViewSubject(null)}
              color={selectedViewSubject === null ? "#6c5ce7" : "#888"}
            />
            {allSubjects.map((subject) => (
              <View key={subject} style={{ marginLeft: 8 }}>
                <Button
                  title={subject}
                  onPress={() => setSelectedViewSubject(subject)}
                  color={selectedViewSubject === subject ? "#6c5ce7" : "#888"}
                />
              </View>
            ))}
          </ScrollView>

          <PieChartView
            data={
              selectedViewSubject ? filteredGrades : aggregatedSubjects
            }
            onSlicePress={setSelectedSubject}
          />

          {selectedSubject && (
            <View style={{ marginTop: 16 }}>
              <SubjectBreakdown
                subject={selectedSubject}
                data={subjectBreakdown}
              />
              <View style={{ marginTop: 10 }}>
                <Button
                  title="Clear Selection"
                  onPress={() => setSelectedSubject(null)}
                  color="#666"
                />
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
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
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 4,
    textAlign: "center",
  },
  star: {
    color: "#f1c40f",
    fontSize: 22,
    marginHorizontal: 1,
  },
  starRow: {
    marginTop: 4,
    alignItems: "center",
  },
  innerContainer: {
    paddingBottom: 40, // ensures content doesn't get cut off at the bottom
  },
});

export default AdminHome;
