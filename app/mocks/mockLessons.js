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
  //students: ["תמר", "יונתן"],
  students: [
    { _id: "studentId1", first_name: "תמר", last_name: "כהן" },
    { _id: "studentId2", first_name: "יונתן", last_name: "לוי" },
  ], // רשימת חניכים עם ה-ID הייחודי שלהם
};

// רשימת שיעורים לחיפוש (הרשמה לשיעור) - כולם תחת אותו מקצוע, כיתה וקבוצה
export const mockSearchResults = [
  // סיטואציה 1: רשום ויש מקום
  {
    id: 1,
    subject: "מתמטיקה", // אותו מקצוע
    grade: "ח", // אותה כיתה
    group: "2", // אותה קבוצה
    date: "2.4.2025",
    day: "רביעי",
    startTime: "14:00",
    endTime: "15:00",
    mentor: "יוסי כהן",
    description: "פתרון מבחן בנושא חזקות ושורשים. בדיקה: רשום ויש מקום",
    students: [
      { _id: "studentId3", first_name: "דניאל", last_name: "לוי" },
      { _id: "studentId4", first_name: "נועם", last_name: "כץ" },
      { _id: "studentId5", first_name: "שירה", last_name: "כהן" },
      {
        _id: "67ea663d6ab1596bd4dea9ff",
        first_name: "עידו",
        last_name: "שמעוני",
      }, // עידו רשום לשיעור
    ],
  },

  // סיטואציה 2: רשום ואין מקום
  {
    id: 2,
    subject: "מתמטיקה", // אותו מקצוע
    grade: "ח", // אותה כיתה
    group: "2", // אותה קבוצה
    date: "3.4.2025",
    day: "חמישי",
    startTime: "15:00",
    endTime: "16:00",
    mentor: "נועה ברק",
    description: "חזרה על נושאים לבגרות. בדיקה: רשום ואין מקום",
    students: [
      { _id: "studentId6", first_name: "תמר", last_name: "פרץ" },
      { _id: "studentId7", first_name: "רועי", last_name: "כהן" },
      {
        _id: "67ea663d6ab1596bd4dea9ff",
        first_name: "עידו",
        last_name: "שמעוני",
      }, // עידו רשום לשיעור
    ],
  },

  // סיטואציה 3: לא רשום ויש מקום
  {
    id: 3,
    subject: "מתמטיקה", // אותו מקצוע
    grade: "ח", // אותה כיתה
    group: "2", // אותה קבוצה
    date: "4.4.2025",
    day: "שישי",
    startTime: "12:00",
    endTime: "13:00",
    mentor: "יואב לוי",
    description: "תרגול על נושאים מהשיעור הקודם. בדיקה: לא רשום ויש מקום",
    students: [
      { _id: "studentId8", first_name: "יובל", last_name: "לוי" },
      { _id: "studentId9", first_name: "ליה", last_name: "כהן" },
    ],
  },

  // סיטואציה 4: לא רשום ואין מקום
  {
    id: 4,
    subject: "מתמטיקה", // אותו מקצוע
    grade: "ח", // אותה כיתה
    group: "2", // אותה קבוצה
    date: "5.4.2025",
    day: "שבת",
    startTime: "10:00",
    endTime: "11:00",
    mentor: "גלית בר",
    description: "סיכום לקראת המבחן. בדיקה: לא רשום ואין מקום",
    students: [
      { _id: "studentId1", first_name: "תמר", last_name: "כהן" },
      { _id: "studentId2", first_name: "יונתן", last_name: "לוי" },
      { _id: "studentId3", first_name: "דניאל", last_name: "לוי" },
    ], // רשימת חניכים רשומים (השיעור מלא)
  },
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
    //students: ["יובל", "ליה"],
    students: [
      { _id: "studentId8", first_name: "יובל", last_name: "לוי" },
      { _id: "studentId9", first_name: "ליה", last_name: "כהן" },
    ], // רשימת חניכים עם ה-ID הייחודי שלהם
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
    //students: ["עומר", "רוני"],
    students: [
      { _id: "studentId10", first_name: "עומר", last_name: "גולן" },
      { _id: "studentId11", first_name: "רוני", last_name: "מזרחי" },
    ], // רשימת חניכים עם ה-ID הייחודי שלהם
  },
];

// סיטואציה 1 - חניך רשום לשיעור
export const mockStudentRegistered = {
  students: [
    {
      _id: "67ea663d6ab1596bd4dea9ff",
      first_name: "עידו",
      last_name: "שמעוני",
    }, // עידו רשום לשיעור
    { _id: "studentId2", first_name: "יונתן", last_name: "לוי" },
  ], // החניכים הרשומים לשיעור
};

// סיטואציה 2 - חניך לא רשום ויש מקום להרשם
export const mockStudentNotRegistered = {
  students: [
    { _id: "studentId4", first_name: "נועם", last_name: "כץ" },
    { _id: "studentId5", first_name: "שירה", last_name: "כהן" },
  ], // החניכים הרשומים לשיעור
};

// סיטואציה 3 - חניך לא רשום ואין מקום להרשם
export const mockStudentNoSpace = {
  students: [
    { _id: "studentId1", first_name: "תמר", last_name: "כהן" },
    { _id: "studentId2", first_name: "יונתן", last_name: "לוי" },
    { _id: "studentId3", first_name: "דניאל", last_name: "לוי" },
  ], // החניכים הרשומים לשיעור (השיעור מלא)
};
