import { CodeReadingProgress, CodeReadingProblem } from '../types';

const CODE_READING_STORAGE_KEY = 'code_reading_progress_v1';

const defaultProgress: CodeReadingProgress = {
  weakProblems: [],
  completedSessions: 0,
  totalProblemsAttempted: 0,
  averageScore: 0,
};

export const getCodeReadingProgress = (): CodeReadingProgress => {
  try {
    const stored = localStorage.getItem(CODE_READING_STORAGE_KEY);
    if (!stored) {
      return { ...defaultProgress };
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load code reading progress", e);
    return { ...defaultProgress };
  }
};

export const saveCodeReadingProgress = (progress: CodeReadingProgress): void => {
  try {
    localStorage.setItem(CODE_READING_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save code reading progress", e);
  }
};

export const addWeakProblem = (problem: CodeReadingProblem): void => {
  const progress = getCodeReadingProgress();
  // Avoid duplicates
  if (!progress.weakProblems.find(p => p.id === problem.id)) {
    progress.weakProblems.push(problem);
    saveCodeReadingProgress(progress);
  }
};

export const removeWeakProblem = (problemId: string): void => {
  const progress = getCodeReadingProgress();
  progress.weakProblems = progress.weakProblems.filter(p => p.id !== problemId);
  saveCodeReadingProgress(progress);
};

export const updateSessionStats = (problemCount: number, totalScore: number): void => {
  const progress = getCodeReadingProgress();
  const previousTotal = progress.averageScore * progress.totalProblemsAttempted;
  
  progress.completedSessions += 1;
  progress.totalProblemsAttempted += problemCount;
  progress.averageScore = progress.totalProblemsAttempted > 0
    ? (previousTotal + totalScore) / progress.totalProblemsAttempted
    : 0;
    
  saveCodeReadingProgress(progress);
};
