interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string; // Icon is a React component
  color: string;   // Color is a required string
}

export const quizCategories: QuizCategory[] = [
  { 
    id: '19', 
    name: "Mathematics", 
    description: "Test your math skills with this quiz.", 
    color: "#6366f1", 
    icon: 'math' 
  },
  { 
    id: '17', 
    name: "Science", 
    description: "Challenge yourself with science questions.", 
    color: "#14b8a6", 
    icon: 'science' 
  },
  { 
    id: '23',
    name: "History", 
    description: "How well do you know historical events?", 
    color: "#f97316", 
    icon: 'history' 
  },
  { 
    id: '22', 
    name: "Geography", 
    description: "Explore the world with this geography quiz.", 
    color: "#ef4444", 
    icon: 'geography' 
  },
  { 
    id: '18', 
    name: "Technology", 
    description: "Are you a tech geek? Prove it!", 
    color: "#3b82f6", 
    icon: 'tech' 
  },
];
