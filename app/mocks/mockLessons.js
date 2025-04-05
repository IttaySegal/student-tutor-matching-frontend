// שיעורים לדשבורד (שיעור קרוב למנטור או חניך)
export const mockNextLesson = {
    subject: "אנגלית",
    grade: "ח",
    date: "2025-04-06",
    day: "ראשון",
    startTime: "14:00",
    endTime: "15:00",
    mentor: "נועה כהן",
    student: "יוסי לוי", // למנטור בלבד
    description: "שיעור באנגלית – הכנה למבחן",
    students: ["תמר", "יונתן"],
    isMentor: true,
  };
  
  // רשימת שיעורים לחיפוש (הרשמה לשיעור)
  export const mockSearchResults = [
    {
      id: 1,
      subject: "מתמטיקה",
      grade: "ח",
      group: "2",
      date: "2.4.2025",
      day: "רביעי",
      startTime: "14:00",
      endTime: "15:00",
      mentor: "יוסי כהן",
      description: "פתרון מבחן בנושא חזקות ושורשים",
      students: ["דניאל", "נועם", "שירה"],
      isMentor: false,
    },
    {
      id: 2,
      subject: "מתמטיקה",
      grade: "ח",
      group: "2",
      date: "3.4.2025",
      day: "חמישי",
      startTime: "15:00",
      endTime: "16:00",
      mentor: "נועה ברק",
      description: "חזרה על נושאים לבגרות",
      students: ["תמר", "רועי"],
      isMentor: false,
    },
    // ...המשך לפי הצורך
  ];
  
  // רשימת שיעורים אישיים (של המנטור או החניך)
  export const mockMyLessons = [
    {
      id: 3,
      subject: "פיזיקה",
      grade: "ח",
      group: "1",
      date: "4.4.2025",
      startTime: "12:00",
      endTime: "13:00",
      mentor: "יואב לוי",
      description: "שיעור תרגול במודול טריגונומטריה",
      students: ["יובל", "ליה"],
      isMentor: true,
    },
    {
      id: 4,
      subject: "מתמטיקה",
      grade: "ח",
      group: "2",
      date: "5.4.2025",
      startTime: "11:00",
      endTime: "12:00",
      mentor: "גלית בר",
      description: "חזרה על חקירת פונקציות",
      students: ["עומר", "רוני"],
      isMentor: false,
    },
  ];
  