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
    
    // Code Reading Feature
    codeReadingTitle: 'Code Reading Enhancement',
    codeReadingDesc: 'Improve your code reading and explanation skills',
    selectLanguage: 'Select Programming Language',
    selectLevel: 'Select Experience Level',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    startPractice: 'Start Practice',
    question: 'Question',
    problemOf: 'Problem {current} of {total}',
    yourExplanation: 'Your Explanation',
    explainPlaceholder: 'Explain what this code does, its purpose, and key concepts used...',
    submitAnswer: 'Submit Answer',
    getHint: 'Get Hint',
    hint: 'Hint',
    next: 'Next',
    score: 'Score',
    pass: 'Pass',
    fail: 'Needs Improvement',
    sessionComplete: 'Session Complete!',
    totalScore: 'Total Score',
    correctAnswers: 'Correct Answers',
    weakProblemsAdded: 'Weak problems saved for review',
    reviewWeakProblems: 'Review Weak Problems',
    noWeakProblems: 'No weak problems to review',
    backToSetup: 'Back to Setup',
    generatingProblem: 'Generating problem...',
    evaluatingAnswer: 'Evaluating answer...',
    reviewMode: 'Review Mode',
    weakProblemsCount: '{count} problems to review',
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
    
    // Code Reading Feature
    codeReadingTitle: 'コードリーディング強化',
    codeReadingDesc: 'コード読解力と言語化スキルを向上させましょう',
    selectLanguage: 'プログラミング言語を選択',
    selectLevel: '実務経験レベルを選択',
    beginner: '初級',
    intermediate: '中級',
    advanced: '上級',
    startPractice: '練習を開始',
    question: '問題',
    problemOf: '問題 {current} / {total}',
    yourExplanation: 'あなたの説明',
    explainPlaceholder: 'このコードが何をするか、その目的、使用されている主要な概念を説明してください...',
    submitAnswer: '回答を提出',
    getHint: 'ヒントを見る',
    hint: 'ヒント',
    next: '次へ',
    score: 'スコア',
    pass: '合格',
    fail: '要改善',
    sessionComplete: 'セッション完了！',
    totalScore: '総合スコア',
    correctAnswers: '正解数',
    weakProblemsAdded: '苦手問題を復習用に保存しました',
    reviewWeakProblems: '苦手問題を復習',
    noWeakProblems: '復習する苦手問題はありません',
    backToSetup: '設定に戻る',
    generatingProblem: '問題を生成中...',
    evaluatingAnswer: '回答を評価中...',
    reviewMode: '復習モード',
    weakProblemsCount: '{count}問の復習問題',
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
