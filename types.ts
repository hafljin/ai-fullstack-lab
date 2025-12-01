export interface UserProgress {
  read: string[];      // IDs of topics read
  practiced: string[]; // IDs of practice completed
}

export enum TopicCategory {
  MOBILE_KOTLIN = 'Kotlin (モバイル開発)',
  CS_BASICS = 'Computer Science Basics'
}

export type SkillQuizType = 'choice' | 'multi' | 'text' | 'fill';

export interface SkillQuiz {
  id: string;
  type: SkillQuizType;
  question: string;
  questionJa?: string;
  options?: string[]; // choice/multi用
  answer: string | string[]; // textはstring, multiはstring[]
  answerJa?: string | string[];
  hint?: string;
  hintJa?: string;
  explanation?: string;
  explanationJa?: string;
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
  examples?: Array<{ code: string; output?: string; explanation?: string; codeJa?: string; explanationJa?: string; }>; // 説明・例
  quickOutput?: { prompt: string; promptJa?: string; answer: string; answerJa?: string; explanation?: string; explanationJa?: string; };
  starterCode: string;     // Initial code for the editor
  practicePrompt: string;  // The task description for the user
  practicePromptJa?: string; // Japanese practice prompt
  expectedOutputDescription: string; // Used for simple checks or AI prompting
  expectedOutputDescriptionJa?: string; // Japanese expected output
  quizzes?: SkillQuiz[]; // 理解度チェック問題リスト
  grading?: { minScore: number; total: number; }; // 合格基準
  resultFlow?: {
    pass: Array<{ label: string; action: 'next' | 'retry' | 'hint'; labelJa?: string; }>;
    fail: Array<{ label: string; action: 'retry' | 'hint'; labelJa?: string; }>;
  };
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
