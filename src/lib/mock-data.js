export const mockUsers = [
  { id: 1, name: "Alice Kumar", email: "alice@example.com", password: "password123", rollNumber: "CS001", score: 980, avatar: "AK" },
  { id: 2, name: "Bob Singh", email: "bob@example.com", password: "password123", rollNumber: "CS002", score: 950, avatar: "BS" },
  { id: 3, name: "Charlie Patel", email: "charlie@example.com", password: "password123", rollNumber: "CS003", score: 920, avatar: "CP" },
  { id: 4, name: "Diana Shah", email: "diana@example.com", password: "password123", rollNumber: "CS004", score: 890, avatar: "DS" },
  { id: 5, name: "Ethan Verma", email: "ethan@example.com", password: "password123", rollNumber: "CS005", score: 860, avatar: "EV" },
  { id: 6, name: "Fiona Desai", email: "fiona@example.com", password: "password123", rollNumber: "CS006", score: 830, avatar: "FD" },
  { id: 7, name: "George Reddy", email: "george@example.com", password: "password123", rollNumber: "CS007", score: 800, avatar: "GR" },
  { id: 8, name: "Hannah Iyer", email: "hannah@example.com", password: "password123", rollNumber: "CS008", score: 770, avatar: "HI" },
  { id: 9, name: "Ian Chopra", email: "ian@example.com", password: "password123", rollNumber: "CS009", score: 740, avatar: "IC" },
  { id: 10, name: "Julia Nair", email: "julia@example.com", password: "password123", rollNumber: "CS010", score: 710, avatar: "JN" },
  { id: 11, name: "Kevin Joshi", email: "kevin@example.com", password: "password123", rollNumber: "CS011", score: 680, avatar: "KJ" },
  { id: 12, name: "Lara Gupta", email: "lara@example.com", password: "password123", rollNumber: "CS012", score: 650, avatar: "LG" },
];

export const mockSessions = [
  {
    id: 1,
    title: "Session 1: Introduction to Python & ML Basics",
    date: "2025-10-01",
    resources: [101, 102, 103]
  },
  {
    id: 2,
    title: "Session 2: NumPy & Data Manipulation",
    date: "2025-10-08",
    resources: [104, 105, 106]
  },
  {
    id: 3,
    title: "Session 3: Pandas for Data Analysis",
    date: "2025-10-15",
    resources: [107, 108, 109]
  },
  {
    id: 4,
    title: "Session 4: Data Visualization with Matplotlib",
    date: "2025-10-22",
    resources: [110, 111, 112]
  },
];

export const mockResources = [
  { id: 101, sessionId: 1, title: "Introduction to Python - Slides", type: "ppt", url: "https://example.com/intro-python.pptx" },
  { id: 102, sessionId: 1, title: "ML Basics - Notes", type: "pdf", url: "https://example.com/ml-basics.pdf" },
  { id: 103, sessionId: 1, title: "Session 1 Recording", type: "video", url: "https://www.youtube.com/watch?v=example1" },
  { id: 104, sessionId: 2, title: "NumPy Tutorial - Slides", type: "ppt", url: "https://example.com/numpy-tutorial.pptx" },
  { id: 105, sessionId: 2, title: "NumPy Cheat Sheet", type: "pdf", url: "https://example.com/numpy-cheat.pdf" },
  { id: 106, sessionId: 2, title: "Session 2 Recording", type: "video", url: "https://www.youtube.com/watch?v=example2" },
  { id: 107, sessionId: 3, title: "Pandas Basics - Slides", type: "ppt", url: "https://example.com/pandas-basics.pptx" },
  { id: 108, sessionId: 3, title: "Pandas Practice Dataset", type: "pdf", url: "https://example.com/pandas-data.csv" },
  { id: 109, sessionId: 3, title: "Session 3 Recording", type: "video", url: "https://www.youtube.com/watch?v=example3" },
  { id: 110, sessionId: 4, title: "Matplotlib Tutorial - Slides", type: "ppt", url: "https://example.com/matplotlib.pptx" },
  { id: 111, sessionId: 4, title: "Visualization Examples", type: "pdf", url: "https://example.com/viz-examples.pdf" },
  { id: 112, sessionId: 4, title: "Session 4 Recording", type: "video", url: "https://www.youtube.com/watch?v=example4" },
];

export const mockAssignments = [
  { id: 201, title: "Daily Quiz 1: Python Basics", type: "quiz", due: "2025-10-03", status: "submitted", sessionId: 1, quizId: 301 },
  { id: 202, title: "Coding Assignment 1: Python Warmup", type: "coding", due: "2025-10-05", status: "graded", sessionId: 1 },
  { id: 203, title: "Daily Quiz 2: NumPy Fundamentals", type: "quiz", due: "2025-10-10", status: "pending", sessionId: 2, quizId: 302 },
  { id: 204, title: "Coding Assignment 2: Array Operations", type: "coding", due: "2025-10-12", status: "pending", sessionId: 2 },
  { id: 205, title: "Daily Quiz 3: Pandas Essentials", type: "quiz", due: "2025-10-17", status: "pending", sessionId: 3, quizId: 303 },
  { id: 206, title: "Coding Assignment 3: Data Analysis", type: "coding", due: "2025-10-19", status: "pending", sessionId: 3 },
  { id: 207, title: "Daily Quiz 4: Matplotlib Basics", type: "quiz", due: "2025-10-24", status: "pending", sessionId: 4, quizId: 304 },
];

export const mockQuizzes = [
  {
    id: 301,
    title: "Daily Quiz 1: Python Basics",
    duration: 600,
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What is the output of: print(type([]))?",
        choices: ["<class 'list'>", "<class 'dict'>", "<class 'tuple'>", "<class 'set'>"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 2,
        type: "mcq",
        question: "Which keyword is used to define a function in Python?",
        choices: ["func", "define", "def", "function"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 3,
        type: "text",
        question: "What does 'ML' stand for in the context of this course?",
        correctAnswer: "Machine Learning",
        points: 10
      },
      {
        id: 4,
        type: "mcq",
        question: "What is the correct way to create a dictionary in Python?",
        choices: ["[]", "{}", "()", "<<>>"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 5,
        type: "mcq",
        question: "Which of these is NOT a valid Python data type?",
        choices: ["int", "float", "char", "str"],
        correctAnswer: 2,
        points: 10
      }
    ]
  },
  {
    id: 302,
    title: "Daily Quiz 2: NumPy Fundamentals",
    duration: 600,
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What is the primary data structure in NumPy?",
        choices: ["List", "Array", "DataFrame", "Series"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        type: "mcq",
        question: "Which function creates an array of zeros in NumPy?",
        choices: ["np.empty()", "np.zeros()", "np.null()", "np.zero()"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 3,
        type: "text",
        question: "What does 'ndarray' stand for?",
        correctAnswer: "n-dimensional array",
        points: 10
      }
    ]
  },
  {
    id: 303,
    title: "Daily Quiz 3: Pandas Essentials",
    duration: 600,
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What are the two main data structures in Pandas?",
        choices: ["List and Array", "Series and DataFrame", "Array and Matrix", "Table and Column"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        type: "mcq",
        question: "Which method is used to read a CSV file in Pandas?",
        choices: ["pd.open_csv()", "pd.read_csv()", "pd.load_csv()", "pd.import_csv()"],
        correctAnswer: 1,
        points: 10
      }
    ]
  },
  {
    id: 304,
    title: "Daily Quiz 4: Matplotlib Basics",
    duration: 600,
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "Which function creates a simple line plot in Matplotlib?",
        choices: ["plt.line()", "plt.plot()", "plt.graph()", "plt.draw()"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        type: "mcq",
        question: "What does 'plt' commonly refer to in Matplotlib code?",
        choices: ["plot", "matplotlib.pyplot", "plotlib", "pythonplot"],
        correctAnswer: 1,
        points: 10
      }
    ]
  }
];

export const mockLeaderboard = [
  { rank: 1, userId: 1, name: "Alice Kumar", score: 980 },
  { rank: 2, userId: 2, name: "Bob Singh", score: 950 },
  { rank: 3, userId: 3, name: "Charlie Patel", score: 920 },
  { rank: 4, userId: 4, name: "Diana Shah", score: 890 },
  { rank: 5, userId: 5, name: "Ethan Verma", score: 860 },
  { rank: 6, userId: 6, name: "Fiona Desai", score: 830 },
  { rank: 7, userId: 7, name: "George Reddy", score: 800 },
  { rank: 8, userId: 8, name: "Hannah Iyer", score: 770 },
  { rank: 9, userId: 9, name: "Ian Chopra", score: 740 },
  { rank: 10, userId: 10, name: "Julia Nair", score: 710 },
];

export const mockUserProgress = {
  1: { userId: 1, completedQuizzes: 2, totalQuizzes: 7, score: 980, progress: 28 },
  2: { userId: 2, completedQuizzes: 2, totalQuizzes: 7, score: 950, progress: 28 },
};
