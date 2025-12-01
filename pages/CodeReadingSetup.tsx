import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { CodeReadingLanguage, ExperienceLevel } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales';
import { getCodeReadingProgress } from '../services/codeReadingStorageService';

const LANGUAGES: CodeReadingLanguage[] = ['JavaScript', 'TypeScript', 'Python', 'Kotlin', 'Java', 'Go'];

const LEVELS: ExperienceLevel[] = ['beginner', 'intermediate', 'advanced'];

export const CodeReadingSetup: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  const [selectedLanguage, setSelectedLanguage] = useState<CodeReadingLanguage | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | null>(null);
  
  const progress = getCodeReadingProgress();
  const hasWeakProblems = progress.weakProblems.length > 0;

  const handleStart = () => {
    if (selectedLanguage && selectedLevel) {
      navigate(`/code-reading/practice?lang=${selectedLanguage}&level=${selectedLevel}`);
    }
  };

  const handleReviewWeakProblems = () => {
    navigate('/code-reading/review');
  };

  const getLevelLabel = (level: ExperienceLevel): string => {
    switch (level) {
      case 'beginner': return t('beginner');
      case 'intermediate': return t('intermediate');
      case 'advanced': return t('advanced');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t('codeReadingTitle')}</h2>
          <p className="text-sm text-slate-500">{t('codeReadingDesc')}</p>
        </div>
      </div>

      {/* Review Weak Problems Button */}
      {hasWeakProblems && (
        <button
          onClick={handleReviewWeakProblems}
          className="w-full bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between hover:bg-amber-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-amber-600" />
            <div className="text-left">
              <span className="font-semibold text-amber-800 block">{t('reviewWeakProblems')}</span>
              <span className="text-sm text-amber-600">{t('weakProblemsCount', { count: progress.weakProblems.length })}</span>
            </div>
          </div>
          <ChevronRight size={20} className="text-amber-600" />
        </button>
      )}

      {/* Language Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">{t('selectLanguage')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`p-3 rounded-xl border-2 font-medium transition-all ${
                selectedLanguage === lang
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Level Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">{t('selectLevel')}</h3>
        <div className="space-y-3">
          {LEVELS.map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedLevel === level
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className={`font-semibold ${selectedLevel === level ? 'text-blue-700' : 'text-slate-700'}`}>
                {getLevelLabel(level)}
              </span>
              <p className="text-sm text-slate-500 mt-1">
                {level === 'beginner' && (language === 'ja' 
                  ? '基本的な変数、ループ、条件分岐 (5-15行)' 
                  : 'Basic variables, loops, conditionals (5-15 lines)')}
                {level === 'intermediate' && (language === 'ja' 
                  ? '関数、クラス、データ構造 (15-30行)' 
                  : 'Functions, classes, data structures (15-30 lines)')}
                {level === 'advanced' && (language === 'ja' 
                  ? '高度なパターン、アルゴリズム (30-50行)' 
                  : 'Advanced patterns, algorithms (30-50 lines)')}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        disabled={!selectedLanguage || !selectedLevel}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          selectedLanguage && selectedLevel
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        {t('startPractice')}
      </button>
    </div>
  );
};
