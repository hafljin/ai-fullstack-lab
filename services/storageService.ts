import { UserProgress } from '../types';

const STORAGE_KEY = 'kotlin_tutor_progress_v1';

export const getProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { read: [], practiced: [] };
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load progress", e);
    return { read: [], practiced: [] };
  }
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
};
