// ─── Home Dashboard ────────────────────────────────────────────────────────────

export const recentProblems = [
  {
    id: "1",
    topic: "Algebra",
    problem: "Solve for x: 3x + 7 = 22",
    answer: "x = 5",
    difficulty: "Easy",
    solvedAt: "2 hours ago",
  },
  {
    id: "2",
    topic: "Geometry",
    problem: "Find the area of a circle with radius 6 cm",
    answer: "≈ 113.1 cm²",
    difficulty: "Medium",
    solvedAt: "Yesterday",
  },
  {
    id: "3",
    topic: "Calculus",
    problem: "Differentiate f(x) = 4x³ − 2x + 9",
    answer: "f'(x) = 12x² − 2",
    difficulty: "Hard",
    solvedAt: "2 days ago",
  },
];

export const streakData = {
  current: 7,
  longest: 14,
  solvedToday: 4,
  totalSolved: 128,
};

export const progressTopics = [
  { topic: "Algebra", progress: 0.72, color: "#7c3aed" },
  { topic: "Geometry", progress: 0.55, color: "#3b82f6" },
  { topic: "Calculus", progress: 0.3, color: "#10b981" },
  { topic: "Statistics", progress: 0.48, color: "#f97316" },
];

// ─── Saved ─────────────────────────────────────────────────────────────────────

export const savedItems = [
  {
    id: "s1",
    type: "problem",
    topic: "Algebra",
    title: "Quadratic Formula Application",
    preview: "x² − 5x + 6 = 0 → x = 2, x = 3",
    savedAt: "Mar 8, 2026",
    tag: "Review",
    tagColor: "#7c3aed",
  },
  {
    id: "s2",
    type: "note",
    topic: "Trigonometry",
    title: "Unit Circle Reference",
    preview: "sin, cos, tan values at key angles",
    savedAt: "Mar 7, 2026",
    tag: "Reference",
    tagColor: "#3b82f6",
  },
  {
    id: "s3",
    type: "problem",
    topic: "Calculus",
    title: "Chain Rule Example",
    preview: "d/dx [sin(x²)] = 2x·cos(x²)",
    savedAt: "Mar 5, 2026",
    tag: "Practice",
    tagColor: "#10b981",
  },
  {
    id: "s4",
    type: "note",
    topic: "Statistics",
    title: "Standard Deviation Formula",
    preview: "σ = √(Σ(xi − μ)² / N)",
    savedAt: "Mar 3, 2026",
    tag: "Reference",
    tagColor: "#3b82f6",
  },
  {
    id: "s5",
    type: "problem",
    topic: "Geometry",
    title: "Pythagorean Theorem Proof",
    preview: "a² + b² = c² applied to 3-4-5 triangle",
    savedAt: "Mar 1, 2026",
    tag: "Review",
    tagColor: "#7c3aed",
  },
];

export const savedFilters = ["All", "Problems", "Notes", "Reference"];

// ─── Learn ─────────────────────────────────────────────────────────────────────

export const learnTopics = [
  {
    id: "l1",
    title: "Algebra Fundamentals",
    description: "Variables, expressions, equations, and inequalities",
    lessons: 12,
    completed: 8,
    icon: "x",
    color: "#7c3aed",
  },
  {
    id: "l2",
    title: "Geometry & Shapes",
    description: "Lines, angles, polygons, circles, and proofs",
    lessons: 10,
    completed: 5,
    icon: "△",
    color: "#3b82f6",
  },
  {
    id: "l3",
    title: "Calculus Basics",
    description: "Limits, derivatives, and integrals",
    lessons: 15,
    completed: 3,
    icon: "∫",
    color: "#10b981",
  },
  {
    id: "l4",
    title: "Trigonometry",
    description: "Angles, triangles, and the unit circle",
    lessons: 8,
    completed: 4,
    icon: "θ",
    color: "#f97316",
  },
  {
    id: "l5",
    title: "Statistics & Probability",
    description: "Data analysis, distributions, and probability",
    lessons: 11,
    completed: 2,
    icon: "σ",
    color: "#ec4899",
  },
];

export const featuredLesson = {
  title: "Understanding Derivatives",
  topic: "Calculus",
  duration: "8 min read",
  description:
    "Learn what a derivative represents geometrically and how the power rule makes differentiation simple.",
};

// ─── Quiz ──────────────────────────────────────────────────────────────────────

export const quizCategories = [
  {
    id: "q1",
    title: "Quick Fire",
    subtitle: "10 questions · 5 min",
    description: "Fast-paced mental math and basic operations",
    icon: "⚡",
    color: "#f97316",
    difficulty: "Easy",
  },
  {
    id: "q2",
    title: "Algebra Challenge",
    subtitle: "15 questions · 12 min",
    description: "Equations, inequalities, and functions",
    icon: "𝑥",
    color: "#7c3aed",
    difficulty: "Medium",
  },
  {
    id: "q3",
    title: "Geometry Gauntlet",
    subtitle: "12 questions · 10 min",
    description: "Shapes, proofs, and coordinate geometry",
    icon: "△",
    color: "#3b82f6",
    difficulty: "Medium",
  },
  {
    id: "q4",
    title: "Calculus Deep Dive",
    subtitle: "10 questions · 15 min",
    description: "Derivatives, integrals, and limits",
    icon: "∫",
    color: "#10b981",
    difficulty: "Hard",
  },
];

export const recentQuizResults = [
  { topic: "Algebra", score: 8, total: 10, date: "Today" },
  { topic: "Quick Fire", score: 7, total: 10, date: "Yesterday" },
  { topic: "Geometry", score: 9, total: 12, date: "Mar 8" },
];

// ─── Settings ──────────────────────────────────────────────────────────────────

export const settingsProfile = {
  name: "Alex Johnson",
  grade: "10th Grade",
  school: "Lincoln High School",
  avatar: "AJ",
  joinedDate: "September 2025",
};

export const settingsSections = [
  {
    title: "Preferences",
    items: [
      { id: "difficulty", label: "Default Difficulty", value: "Medium", type: "select" },
      { id: "notifications", label: "Daily Reminders", value: true, type: "toggle" },
      { id: "sound", label: "Sound Effects", value: true, type: "toggle" },
      { id: "haptics", label: "Haptic Feedback", value: false, type: "toggle" },
    ],
  },
  {
    title: "Study Goals",
    items: [
      { id: "dailyGoal", label: "Daily Problems Goal", value: "5 problems", type: "select" },
      { id: "focusTopic", label: "Focus Topic", value: "Algebra", type: "select" },
      { id: "reminderTime", label: "Reminder Time", value: "7:00 PM", type: "select" },
    ],
  },
  {
    title: "Account",
    items: [
      { id: "profile", label: "Edit Profile", type: "navigate" },
      { id: "export", label: "Export Progress", type: "navigate" },
      { id: "reset", label: "Reset Progress", type: "navigate", destructive: true },
    ],
  },
  {
    title: "About",
    items: [
      { id: "version", label: "App Version", value: "1.0.0", type: "info" },
      { id: "feedback", label: "Send Feedback", type: "navigate" },
      { id: "privacy", label: "Privacy Policy", type: "navigate" },
      { id: "terms", label: "Terms of Service", type: "navigate" },
    ],
  },
];
