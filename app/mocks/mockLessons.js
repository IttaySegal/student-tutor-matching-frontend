// שיעור קודם (prevLesson)
export const mockPrevLesson = {
  id: 4,
  subject: "מתמטיקה",
  grade: "ח",
  date: "1.4.2025",
  day: "חמישי",
  startTime: "11:00",
  endTime: "12:00",
  mentor: "גלית בר",
  description: "חזרה על חקירת פונקציות",
  students: [
    { _id: "s8", first_name: "עומר", last_name: "גולן" },
    { _id: "s9", first_name: "רוני", last_name: "חן" }
  ],
  lessonLocation: "כיתה 4",
  hasReview: false
};

// שיעורים לדשבורד (שיעור קרוב למנטור או חניך)
export const mockNextLesson = {
  id: 5,
  subject: "מתמטיקה",
  grade: "ח",
  date: "6.4.2025",
  day: "שישי",
  startTime: "13:00",
  endTime: "14:00",
  mentor: "עידו כספי",
  description: "תרגול משוואות ריבועיות",
  students: [
    { _id: "s10", first_name: "ליהי", last_name: "שפירא" },
    { _id: "s11", first_name: "אורי", last_name: "ברק" }
  ],
  lessonLocation: "כיתה 2",
  hasReview: false
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
    day: "ראשון",
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
    day: "שני",
    startTime: "15:00",
    endTime: "16:00",
    mentor: "נועה ברק",
    description: "חזרה על נושאים לבגרות. בדיקה: רשום ואין מקום",
    students: [
      { _id: "studentId6", first_name: "תמר", last_name: "דוד" },
      { _id: "studentId7", first_name: "רועי", last_name: "שלום" },
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
    day: "שלישי",
    startTime: "12:00",
    endTime: "13:00",
    mentor: "יואב לוי",
    description: "תרגול על נושאים מהשיעור הקודם. בדיקה: לא רשום ויש מקום",
    students: [
      { _id: "studentId8", first_name: "יובל", last_name: "מזרחי" },
      { _id: "studentId9", first_name: "ליה", last_name: "אשכנזי" },
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
      { _id: "studentId8", first_name: "יובל", last_name: "מזרחי" },
      { _id: "studentId9", first_name: "ליה", last_name: "אשכנזי" },
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
      { _id: "studentId11", first_name: "רוני", last_name: "חן" },
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

export const mockLessons = [
  {
    id: 1,
    subject: "מתמטיקה",
    grade: "ח",
    date: "2.4.2025",
    day: "ראשון",
    startTime: "14:00",
    endTime: "15:00",
    mentor: "יוסי כהן",
    description: "פתרון מבחן בנושא חזקות ושורשים",
    students: [
      { _id: "s1", first_name: "דניאל", last_name: "לוי" },
      { _id: "s2", first_name: "נועם", last_name: "כהן" },
      { _id: "s3", first_name: "שירה", last_name: "אברהם" }
    ],
    lessonLocation: "כיתה 3",
    hasReview: false
  },
  {
    id: 2,
    subject: "מתמטיקה",
    grade: "ח",
    date: "3.4.2025",
    day: "שני",
    startTime: "15:00",
    endTime: "16:00",
    mentor: "נועה ברק",
    description: "חזרה על נושאים לבגרות",
    students: [
      { _id: "s4", first_name: "תמר", last_name: "דוד" },
      { _id: "s5", first_name: "רועי", last_name: "שלום" }
    ],
    lessonLocation: "כיתה 5",
    hasReview: false
  },
  {
    id: 3,
    subject: "פיזיקה",
    grade: "ח",
    date: "4.4.2025",
    day: "שלישי",
    startTime: "12:00",
    endTime: "13:00",
    mentor: "יואב לוי",
    description: "שיעור תרגול במודול טריגונומטריה",
    students: [
      { _id: "s6", first_name: "יובל", last_name: "מזרחי" },
      { _id: "s7", first_name: "ליה", last_name: "אשכנזי" }
    ],
    lessonLocation: "מעבדה 2",
    hasReview: true
  }
];
