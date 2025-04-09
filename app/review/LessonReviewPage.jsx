import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import LessonCard from "@/components/LessonCard";
import LessonReviewMentor from "@/components/LessonReviewMentor";
import RTLText from "@/components/RTLText";
import PageHeader from "@/components/PageHeader";
import { mockLessons } from "@/app/mocks/mockLessons";

const LessonReviewPage = () => {
  const [lessons, setLessons] = useState(mockLessons);
  
  const handleSubmitReview = (lessonId, reviewData) => {
    console.log("שיעור:", lessonId);
    console.log("סקירה:", reviewData);
    
    // כאן תוכל לשלוח את הסקירה לשרת
    // לדוגמה: submitLessonReview(lessonId, reviewData);
    
    // עדכון מקומי של השיעורים (לצורך הדגמה)
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, hasReview: true } 
          : lesson
      )
    );
  };

  return (
    <View style={styles.container}>
      <PageHeader title="סקירת שיעורים" />
      
      <RTLText style={styles.headerText}>
        בחר שיעור כדי להוסיף סקירה
      </RTLText>

      {lessons.length > 0 ? (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <LessonCard 
                {...item} 
                ModalComponent={LessonReviewMentor}
                modalProps={{
                  onSubmit: (reviewData) => handleSubmitReview(item.id, reviewData)
                }}
              />
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>
          אין שיעורים להצגה
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#e5e5e5",
    marginTop: 40,
  },
});

export default LessonReviewPage; 