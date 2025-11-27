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
