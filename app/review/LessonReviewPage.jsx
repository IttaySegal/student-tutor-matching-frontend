import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import LessonCard from "../../components/LessonCard";
import LessonReviewMentor from "../../components/LessonReviewMentor";
import RTLText from "../../components/RTLText";
import PageHeader from "../../components/PageHeader";
import { mockLessons } from "../mocks/mockLessons";

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
    <View className="flex-1 bg-primary px-4 py-6">
      <PageHeader title="סקירת שיעורים" />
      
      <RTLText className="text-white text-lg mb-4">
        בחר שיעור כדי להוסיף סקירה
      </RTLText>

      {lessons.length > 0 ? (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mb-3">
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
        <Text className="text-center text-gray-200 mt-10">
          אין שיעורים להצגה
        </Text>
      )}
    </View>
  );
};

export default LessonReviewPage; 