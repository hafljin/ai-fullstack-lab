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
