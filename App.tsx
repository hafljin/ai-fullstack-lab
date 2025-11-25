import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CourseKotlin } from './pages/CourseKotlin';
import { Dashboard } from './pages/Dashboard';
import { TopicView } from './pages/TopicView';
import { PracticeView } from './pages/PracticeView';
import { UserProgress } from './types';
import { getProgress, saveProgress } from './services/storageService';
import { LanguageProvider } from './contexts/LanguageContext';

// --- Context ---
interface AppContextType {
  progress: UserProgress;
  markComplete: (topicId: string, type: 'read' | 'practice') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

// Helper to scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Main App Component ---
const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>({ read: [], practiced: [] });

  useEffect(() => {
    const loaded = getProgress();
    setProgress(loaded);
  }, []);

  const markComplete = (topicId: string, type: 'read' | 'practice') => {
    setProgress((prev) => {
      const newList = type === 'read' ? [...prev.read, topicId] : [...prev.practiced, topicId];
      // minimal unique set logic
      const uniqueList = Array.from(new Set(newList));
      const newProgress = { ...prev, [type === 'read' ? 'read' : 'practiced']: uniqueList };
      saveProgress(newProgress);
      return newProgress;
    });
  };

  return (
    <LanguageProvider>
      <AppContext.Provider value={{ progress, markComplete }}>
        <HashRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/course/kotlin" element={<CourseKotlin />} />
              <Route path="/topic/:id/read" element={<TopicView />} />
              <Route path="/topic/:id/practice" element={<PracticeView />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </HashRouter>
      </AppContext.Provider>
    </LanguageProvider>
  );
};

export default App;