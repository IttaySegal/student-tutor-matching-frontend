// Previous lesson (prevLesson)
export const mockPrevLesson = {
  id: 4,
  subject: "Mathematics",
  grade: "8",
  date: "1.4.2025",
  day: "Thursday",
  startTime: "11:00",
  endTime: "12:00",
  mentor: "Galit Bar",
  description: "Review of function analysis",
  format: "online",
  students: [
    { _id: "s8", first_name: "Omer", last_name: "Golan" },
    { _id: "s9", first_name: "Roni", last_name: "Chen" },
  ],
  lessonLocation: "Classroom 4",
  hasReview: false,
};

// Next lesson for dashboard (next lesson for mentor or student)
export const mockNextLesson = {
  id: 5,
  subject: "Mathematics",
  grade: "8",
  date: "6.4.2025",
  day: "Friday",
  startTime: "13:00",
  endTime: "14:00",
  mentor: "Ido Caspi",
  description: "Practice quadratic equations",
  format: "online",
  students: [
    { _id: "s10", first_name: "Lihi", last_name: "Shapira" },
    { _id: "s11", first_name: "Uri", last_name: "Barak" },
  ],
  lessonLocation: "Classroom 2",
  hasReview: false,
};

// List of lessons for search (lesson registration) - all under the same subject, grade and group
export const mockSearchResults = [
  // Scenario 1: Registered and space available
  {
    id: 1,
    subject: "Mathematics",
    grade: "8",
    group: "2",
    date: "2.4.2025",
    day: "Sunday",
    startTime: "14:00",
    endTime: "15:00",
    mentor: "Yossi Cohen",
    description:
      "Test preparation on powers and roots. Check: Registered and space available",
    format: "online",
    students: [
      { _id: "studentId3", first_name: "Daniel", last_name: "Levi" },
      { _id: "studentId4", first_name: "Noam", last_name: "Katz" },
      { _id: "studentId5", first_name: "Shira", last_name: "Cohen" },
      {
        _id: "67ea663d6ab1596bd4dea9ff",
        first_name: "Ido",
        last_name: "Shimony",
      },
    ],
  },

  // Scenario 2: Registered and no space
  {
    id: 2,
    subject: "Mathematics",
    grade: "8",
    group: "2",
    date: "3.4.2025",
    day: "Monday",
    startTime: "15:00",
    endTime: "16:00",
    mentor: "Noa Barak",
    description:
      "Review of topics for final exam. Check: Registered and no space",
    format: "online",
    students: [
      { _id: "studentId6", first_name: "Tamar", last_name: "David" },
      { _id: "studentId7", first_name: "Roi", last_name: "Shalom" },
      {
        _id: "67ea663d6ab1596bd4dea9ff",
        first_name: "Ido",
        last_name: "Shimony",
      },
    ],
  },

  // Scenario 3: Not registered and space available
  {
    id: 3,
    subject: "Mathematics",
    grade: "8",
    group: "2",
    date: "4.4.2025",
    day: "Tuesday",
    startTime: "12:00",
    endTime: "13:00",
    mentor: "Yoav Levi",
    description:
      "Practice on topics from previous lesson. Check: Not registered and space available",
    format: "online",
    students: [
      { _id: "studentId8", first_name: "Yuval", last_name: "Mizrahi" },
      { _id: "studentId9", first_name: "Lia", last_name: "Ashkenazi" },
    ],
  },

  // Scenario 4: Not registered and no space
  {
    id: 4,
    subject: "Mathematics",
    grade: "8",
    group: "2",
    date: "5.4.2025",
    day: "Wednesday",
    startTime: "10:00",
    endTime: "11:00",
    mentor: "Galit Bar",
    description: "Summary before the test. Check: Not registered and no space",
    format: "online",
    students: [
      { _id: "studentId1", first_name: "Tamar", last_name: "Cohen" },
      { _id: "studentId2", first_name: "Yonatan", last_name: "Levi" },
      { _id: "studentId3", first_name: "Daniel", last_name: "Levi" },
    ],
  },
];

// Personal lessons list (for mentor or student)
export const mockMyLessons = [
  {
    id: 3,
    subject: "Physics",
    grade: "8",
    group: "1",
    date: "4.4.2025",
    startTime: "12:00",
    endTime: "13:00",
    mentor: "Yoav Levi",
    description: "Practice lesson in trigonometry module",
    format: "online",
    students: [
      { _id: "studentId8", first_name: "Yuval", last_name: "Mizrahi" },
      { _id: "studentId9", first_name: "Lia", last_name: "Ashkenazi" },
    ],
  },
  {
    id: 4,
    subject: "Mathematics",
    grade: "8",
    group: "2",
    date: "5.4.2025",
    startTime: "11:00",
    endTime: "12:00",
    mentor: "Galit Bar",
    description: "Review of function analysis",
    format: "online",
    students: [
      { _id: "studentId10", first_name: "Omer", last_name: "Golan" },
      { _id: "studentId11", first_name: "Roni", last_name: "Chen" },
    ],
  },
];

// Scenario 1 - Student registered for lesson
export const mockStudentRegistered = {
  students: [
    {
      _id: "67ea663d6ab1596bd4dea9ff",
      first_name: "Ido",
      last_name: "Shimony",
    },
    { _id: "studentId2", first_name: "Yonatan", last_name: "Levi" },
  ],
};

// Scenario 2 - Student not registered and space available
export const mockStudentNotRegistered = {
  students: [
    { _id: "studentId4", first_name: "Noam", last_name: "Katz" },
    { _id: "studentId5", first_name: "Shira", last_name: "Cohen" },
  ],
};

// Scenario 3 - Student not registered and no space
export const mockStudentNoSpace = {
  students: [
    { _id: "studentId1", first_name: "Tamar", last_name: "Cohen" },
    { _id: "studentId2", first_name: "Yonatan", last_name: "Levi" },
    { _id: "studentId3", first_name: "Daniel", last_name: "Levi" },
  ],
};

export const mockLessons = [
  {
    id: 1,
    subject: "Mathematics",
    grade: "8",
    date: "2.4.2025",
    day: "Sunday",
    startTime: "14:00",
    endTime: "15:00",
    mentor: "Yossi Cohen",
    description: "Test preparation on powers and roots",
    format: "online",
    students: [
      { _id: "s1", first_name: "Daniel", last_name: "Levi" },
      { _id: "s2", first_name: "Noam", last_name: "Cohen" },
      { _id: "s3", first_name: "Shira", last_name: "Abraham" },
    ],
    lessonLocation: "Classroom 3",
    hasReview: false,
  },
  {
    id: 2,
    subject: "Mathematics",
    grade: "8",
    date: "3.4.2025",
    day: "Monday",
    startTime: "15:00",
    endTime: "16:00",
    mentor: "Noa Barak",
    description: "Review of topics for final exam",
    format: "online",
    students: [
      { _id: "s4", first_name: "Tamar", last_name: "David" },
      { _id: "s5", first_name: "Roi", last_name: "Shalom" },
    ],
    lessonLocation: "Classroom 5",
    hasReview: false,
  },
  {
    id: 3,
    subject: "Physics",
    grade: "8",
    date: "4.4.2025",
    day: "Tuesday",
    startTime: "12:00",
    endTime: "13:00",
    mentor: "Yoav Levi",
    description: "Practice lesson in trigonometry module",
    format: "online",
    students: [
      { _id: "s6", first_name: "Yuval", last_name: "Mizrahi" },
      { _id: "s7", first_name: "Lia", last_name: "Ashkenazi" },
    ],
    lessonLocation: "Lab 2",
    hasReview: true,
  },
];
