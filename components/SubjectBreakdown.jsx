// components/SubjectBreakdown.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * SubjectBreakdown displays a breakdown of lesson counts by grade
 * for a selected subject.
 * 
 * Props:
 * - subject: string (e.g., "Mathematics")
 * - data: array of objects with shape { grade: string, count: number }
 */
const SubjectBreakdown = ({ subject, data }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Grade Breakdown for {subject}</Text>
            {data.length === 0 ? (
                <Text style={styles.empty}>No grade data available</Text>
            ) : (
                data.map((entry, index) => (
                    <Text key={index} style={styles.item}>
                        Grade {entry.grade}: {entry.count} lessons
                    </Text>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 16,
        backgroundColor: "#f1f1f1",
        borderRadius: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    item: {
        fontSize: 14,
        paddingVertical: 2,
    },
    empty: {
        fontSize: 14,
        fontStyle: "italic",
        color: "#666",
    },
});

export default SubjectBreakdown;
