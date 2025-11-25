import { Language } from './contexts/LanguageContext';

export const translations = {
  en: {
    // Layout
    appTitle: 'Kotlin Tutor',
    home: 'Home',
    docs: 'Docs',
    footer: 'Kotlin Tutor PWA. Built with React & Gemini.',
    
    // Dashboard
    welcomeBack: 'Welcome Back!',
    progressMessage: "You've mastered {count} skills so far. Keep coding!",
    read: 'Read',
    practiced: 'Practiced',
    lessons: 'lessons',
    practice: 'Practice',
    
    // TopicView
    aiTutor: 'AI Tutor',
    aiPlaceholder: 'Confused? Ask about this topic...',
    ask: 'Ask',
    markAsRead: 'Mark as Read & Practice',
    
    // PracticeView
    practicePrefix: 'Practice:',
    task: 'Task',
    goal: 'Goal',
    greatJob: 'Great Job!',
    almostThere: 'Almost there...',
    runAndCheck: 'Run & Check',
    analyzing: 'Analyzing...',
    backToReading: 'Back to Reading',
    backToHome: 'Back to Home',
    
    // Common
    loading: '...',
    topicNotFound: 'Topic not found',
  },
  ja: {
    // Layout
    appTitle: 'Kotlinチューター',
    home: 'ホーム',
    docs: 'ドキュメント',
    footer: 'Kotlin Tutor PWA. ReactとGeminiで構築。',
    
    // Dashboard
    welcomeBack: 'おかえりなさい！',
    progressMessage: 'これまでに{count}個のスキルを習得しました。コーディングを続けましょう！',
    read: '読了',
    practiced: '練習済',
    lessons: 'レッスン',
    practice: '練習',
    
    // TopicView
    aiTutor: 'AIチューター',
    aiPlaceholder: 'わからないことはありますか？このトピックについて質問してください...',
    ask: '質問',
    markAsRead: '読了にして練習する',
    
    // PracticeView
    practicePrefix: '練習:',
    task: 'タスク',
    goal: 'ゴール',
    greatJob: '素晴らしい！',
    almostThere: 'もう少し...',
    runAndCheck: '実行して確認',
    analyzing: '分析中...',
    backToReading: '読む画面に戻る',
    backToHome: 'ホームに戻る',
    
    // Common
    loading: '...',
    topicNotFound: 'トピックが見つかりません',
  },
};

export const useTranslation = (language: Language) => {
  return (key: keyof typeof translations.en, params?: Record<string, string | number>) => {
    let text = translations[language][key] || translations.en[key];
    
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    
    return text;
  };
};
