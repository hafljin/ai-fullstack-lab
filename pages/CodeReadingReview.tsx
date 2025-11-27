import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Send, Loader2, CheckCircle, XCircle, Home, Trash2 } from 'lucide-react';
import { CodeReadingProblem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales';
import { evaluateCodeReadingAnswer, getHintForProblem } from '../services/geminiService';
import { getCodeReadingProgress, removeWeakProblem, saveCodeReadingProgress } from '../services/codeReadingStorageService';

export const CodeReadingReview: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const isJapanese = language === 'ja';

  const [weakProblems, setWeakProblems] = useState<CodeReadingProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [hint, setHint] = useState<string | null>(null);
  const [currentFeedback, setCurrentFeedback] = useState<{ score: number; feedback: string } | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [loadingHint, setLoadingHint] = useState(false);

  useEffect(() => {
    const progress = getCodeReadingProgress();
    if (progress.weakProblems.length === 0) {
      navigate('/code-reading');
      return;
    }
    setWeakProblems(progress.weakProblems);
  }, [navigate]);

  const currentProblem = weakProblems[currentIndex];

  const handleSubmitAnswer = async () => {
    if (!currentProblem || !userAnswer.trim()) return;

    setEvaluating(true);
    const result = await evaluateCodeReadingAnswer(currentProblem, userAnswer.trim(), isJapanese);
    setCurrentFeedback(result);
    
    // If score >= 80, remove from weak problems
    if (result.score >= 80) {
      removeWeakProblem(currentProblem.id);
      setWeakProblems(prev => prev.filter(p => p.id !== currentProblem.id));
    }
    
    setEvaluating(false);
  };

  const handleNext = () => {
    setHint(null);
    setCurrentFeedback(null);
    setUserAnswer('');
    
    // Check if we have more problems to review
    // Note: weakProblems may have been reduced if last answer was correct
    if (weakProblems.length === 0) {
      navigate('/code-reading');
      return;
    }
    
    // If current index is beyond available problems, wrap to start
    if (currentIndex >= weakProblems.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleGetHint = async () => {
    if (!currentProblem) return;
    
    setLoadingHint(true);
    const hintText = await getHintForProblem(currentProblem, isJapanese);
    setHint(hintText);
    setLoadingHint(false);
  };

  const handleRemoveProblem = () => {
    if (!currentProblem) return;
    
    removeWeakProblem(currentProblem.id);
    const newProblems = weakProblems.filter(p => p.id !== currentProblem.id);
    setWeakProblems(newProblems);
    
    if (newProblems.length === 0) {
      navigate('/code-reading');
    } else if (currentIndex >= newProblems.length) {
      setCurrentIndex(newProblems.length - 1);
    }
    
    setHint(null);
    setCurrentFeedback(null);
    setUserAnswer('');
  };

  const getQuestion = () => {
    if (!currentProblem) return '';
    return isJapanese && currentProblem.questionJa ? currentProblem.questionJa : currentProblem.question;
  };

  if (weakProblems.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <p className="text-slate-500 mb-4">{t('noWeakProblems')}</p>
        <Link
          to="/code-reading"
          className="inline-block py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          {t('backToSetup')}
        </Link>
      </div>
    );
  }

  if (!currentProblem) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Link to="/code-reading" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <h2 className="font-bold text-slate-900">{t('reviewMode')}</h2>
            <p className="text-xs text-slate-500">{currentProblem.language} • {t(currentProblem.level)}</p>
          </div>
        </div>
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <Home size={20} className="text-slate-600" />
        </Link>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl p-3">
        <span className="text-amber-800 font-medium">
          {t('problemOf', { current: currentIndex + 1, total: weakProblems.length })}
        </span>
        <button
          onClick={handleRemoveProblem}
          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors"
          title={isJapanese ? 'この問題を削除' : 'Remove this problem'}
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">{isJapanese ? '削除' : 'Remove'}</span>
        </button>
      </div>

      {/* Code Display */}
      <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-slate-700">
        <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-white/10">
          <span className="text-xs text-slate-400 font-mono">{currentProblem.language}</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm text-slate-100 font-mono whitespace-pre-wrap">
          <code>{currentProblem.code}</code>
        </pre>
      </div>

      {/* Question */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <h3 className="font-bold text-blue-900 mb-2">{t('question')}</h3>
        <p className="text-blue-800">{getQuestion()}</p>
      </div>

      {/* Hint */}
      {hint && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 animate-fade-in">
          <h4 className="font-semibold text-amber-800 mb-2">{t('hint')}</h4>
          <p className="text-amber-700 text-sm">{hint}</p>
        </div>
      )}

      {/* Feedback */}
      {currentFeedback && (
        <div className={`rounded-xl p-4 border animate-fade-in ${
          currentFeedback.score >= 80 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            {currentFeedback.score >= 80 ? (
              <CheckCircle className="text-green-600" size={24} />
            ) : (
              <XCircle className="text-red-600" size={24} />
            )}
            <div>
              <span className={`font-bold text-lg ${
                currentFeedback.score >= 80 ? 'text-green-800' : 'text-red-800'
              }`}>
                {t('score')}: {currentFeedback.score}%
              </span>
              <span className={`ml-2 text-sm px-2 py-0.5 rounded-full ${
                currentFeedback.score >= 80 
                  ? 'bg-green-200 text-green-800' 
                  : 'bg-red-200 text-red-800'
              }`}>
                {currentFeedback.score >= 80 ? t('pass') : t('fail')}
              </span>
            </div>
          </div>
          <p className="text-slate-700">{currentFeedback.feedback}</p>
          {currentFeedback.score >= 80 && (
            <p className="text-green-700 mt-2 text-sm font-medium">
              {isJapanese ? '✓ この問題を苦手リストから削除しました' : '✓ Removed from weak problems list'}
            </p>
          )}
        </div>
      )}

      {/* Answer Input */}
      {!currentFeedback && (
        <div className="space-y-3">
          <label className="block font-semibold text-slate-700">{t('yourExplanation')}</label>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={t('explainPlaceholder')}
            rows={5}
            className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!currentFeedback && (
          <>
            <button
              onClick={handleGetHint}
              disabled={loadingHint || !!hint}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingHint ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Lightbulb size={20} />
              )}
              <span>{t('getHint')}</span>
            </button>
            <button
              onClick={handleSubmitAnswer}
              disabled={evaluating || !userAnswer.trim()}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {evaluating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>{t('evaluatingAnswer')}</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>{t('submitAnswer')}</span>
                </>
              )}
            </button>
          </>
        )}
        
        {currentFeedback && (
          <button
            onClick={handleNext}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            {t('next')}
          </button>
        )}
      </div>
    </div>
  );
};
