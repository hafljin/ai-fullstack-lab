export interface UserProgress {
  read: string[];      // IDs of topics read
  practiced: string[]; // IDs of practice completed
}

export enum TopicCategory {
  MOBILE_KOTLIN = 'Kotlin (モバイル開発)',
  CS_BASICS = 'Computer Science Basics'
}

export interface Topic {
  id: string;
  title: string;
  titleJa?: string; // Japanese title
  category: TopicCategory;
  description: string;
  descriptionJa?: string; // Japanese description
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  contentMarkdown: string; // The reading material
  contentMarkdownJa?: string; // Japanese content
  starterCode: string;     // Initial code for the editor
  practicePrompt: string;  // The task description for the user
  practicePromptJa?: string; // Japanese practice prompt
  expectedOutputDescription: string; // Used for simple checks or AI prompting
  expectedOutputDescriptionJa?: string; // Japanese expected output
}

// Code Reading Types
export type CodeReadingLanguage = 'JavaScript' | 'TypeScript' | 'Python' | 'Kotlin' | 'Java' | 'Go';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CodeReadingProblem {
  id: string;
  language: CodeReadingLanguage;
  level: ExperienceLevel;
  code: string;
  question: string;
  questionJa?: string;
  correctExplanation: string;
  correctExplanationJa?: string;
}

export interface CodeReadingAnswer {
  problemId: string;
  userAnswer: string;
  score: number; // 0-100
  isCorrect: boolean; // score >= 80
  feedback: string;
}

export interface CodeReadingSession {
  language: CodeReadingLanguage;
  level: ExperienceLevel;
  problems: CodeReadingProblem[];
  answers: CodeReadingAnswer[];
  currentIndex: number;
  completed: boolean;
  totalScore: number;
}

export interface CodeReadingProgress {
  weakProblems: CodeReadingProblem[]; // Problems with score < 80 for review
  completedSessions: number;
  totalProblemsAttempted: number;
  averageScore: number;
}
