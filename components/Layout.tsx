import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Terminal, Home, Award, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales';

export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const t = useTranslation(language);

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    return `flex flex-col items-center justify-center w-full h-full space-y-1 ${
      isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
    }`;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Terminal size={20} />
          </div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">{t('appTitle')}</h1>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700"
            title="Toggle Language"
          >
            <Languages size={16} />
            <span>{language === 'en' ? 'EN' : '日本語'}</span>
          </button>
          <div className="text-xs text-slate-400 font-mono">MVP v1.0</div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 mb-20 md:mb-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex md:hidden items-center justify-around z-50 pb-safe">
        <Link to="/" className={getLinkClass('/')}>
          <Home size={20} />
          <span className="text-[10px] font-medium">{t('home')}</span>
        </Link>
        <div className="text-slate-300">|</div>
        <a href="https://kotlinlang.org/docs/home.html" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-400 hover:text-blue-500">
          <BookOpen size={20} />
          <span className="text-[10px] font-medium">{t('docs')}</span>
        </a>
      </nav>

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {t('footer')}
        </div>
      </footer>
    </div>
  );
};