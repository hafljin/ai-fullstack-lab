import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Send, Loader2, CheckCircle, XCircle, Home } from 'lucide-react';
import { CodeReadingLanguage, ExperienceLevel, CodeReadingProblem, CodeReadingAnswer } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales';
import { generateCodeReadingProblem, evaluateCodeReadingAnswer, getHintForProblem } from '../services/geminiService';
import { addWeakProblem, updateSessionStats } from '../services/codeReadingStorageService';

const TOTAL_PROBLEMS = 10;

export const CodeReadingPractice: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const isJapanese = language === 'ja';

  const lang = searchParams.get('lang') as CodeReadingLanguage;
  const level = searchParams.get('level') as ExperienceLevel;

  const [currentProblem, setCurrentProblem] = useState<CodeReadingProblem | null>(null);
  const [problems, setProblems] = useState<CodeReadingProblem[]>([]);
  const [answers, setAnswers] = useState<CodeReadingAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [hint, setHint] = useState<string | null>(null);
  const [currentFeedback, setCurrentFeedback] = useState<{ score: number; feedback: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [loadingHint, setLoadingHint] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const generateNextProblem = useCallback(async (index: number) => {
    setLoading(true);
    setHint(null);
    setCurrentFeedback(null);
    setUserAnswer('');
    
    const problem = await generateCodeReadingProblem(lang, level, index, isJapanese);
    
    if (problem) {
      setCurrentProblem(problem);
      setProblems(prev => [...prev, problem]);
    }
    setLoading(false);
  }, [lang, level, isJapanese]);

  useEffect(() => {
    if (!lang || !level) {
      navigate('/code-reading');
      return;
    }
    generateNextProblem(0);
  }, [lang, level, navigate, generateNextProblem]);

  const handleSubmitAnswer = async () => {
    if (!currentProblem || !userAnswer.trim()) return;

    setEvaluating(true);
    const result = await evaluateCodeReadingAnswer(currentProblem, userAnswer.trim(), isJapanese);
    setCurrentFeedback(result);
    
    const answer: CodeReadingAnswer = {
      problemId: currentProblem.id,
      userAnswer: userAnswer.trim(),
      score: result.score,
      isCorrect: result.score >= 80,
      feedback: result.feedback
    };
    
    setAnswers(prev => [...prev, answer]);
    
    // If score < 80, save as weak problem
    if (result.score < 80) {
      addWeakProblem(currentProblem);
    }
    
    setEvaluating(false);
  };

  const handleNext = async () => {
    const nextIndex = currentIndex + 1;
    
    if (nextIndex >= TOTAL_PROBLEMS) {
      // Session complete
      const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
      updateSessionStats(answers.length, totalScore);
      setSessionComplete(true);
    } else {
      setCurrentIndex(nextIndex);
      await generateNextProblem(nextIndex);
    }
  };

  const handleGetHint = async () => {
    if (!currentProblem) return;
    
    setLoadingHint(true);
    const hintText = await getHintForProblem(currentProblem, isJapanese);
    setHint(hintText);
    setLoadingHint(false);
  };

  const getQuestion = () => {
    if (!currentProblem) return '';
    return isJapanese && currentProblem.questionJa ? currentProblem.questionJa : currentProblem.question;
  };

  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const correctCount = answers.filter(a => a.isCorrect).length;
  const averageScore = answers.length > 0 ? Math.round(totalScore / answers.length) : 0;

  if (sessionComplete) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center py-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">{t('sessionComplete')}</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-4xl font-bold">{averageScore}%</div>
                <div className="text-sm opacity-90">{t('totalScore')}</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-4xl font-bold">{correctCount}/{TOTAL_PROBLEMS}</div>
                <div className="text-sm opacity-90">{t('correctAnswers')}</div>
              </div>
            </div>
          </div>
          
          {answers.some(a => !a.isCorrect) && (
            <p className="text-amber-600 mb-4">{t('weakProblemsAdded')}</p>
          )}
          
          <div className="flex flex-col gap-3">
            <Link
              to="/code-reading"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              {t('backToSetup')}
            </Link>
            <Link
              to="/"
              className="w-full py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
    );
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
            <h2 className="font-bold text-slate-900">{t('codeReadingTitle')}</h2>
            <p className="text-xs text-slate-500">{lang} • {t(level)}</p>
          </div>
        </div>
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <Home size={20} className="text-slate-600" />
        </Link>
      </div>

      {/* Progress */}
      <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + (currentFeedback ? 1 : 0)) / TOTAL_PROBLEMS) * 100}%` }}
        />
      </div>
      <p className="text-center text-sm text-slate-500">{t('problemOf', { current: currentIndex + 1, total: TOTAL_PROBLEMS })}</p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
          <p className="text-slate-600">{t('generatingProblem')}</p>
        </div>
      ) : currentProblem ? (
        <>
          {/* Code Display */}
          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-slate-700">
            <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-white/10">
              <span className="text-xs text-slate-400 font-mono">{lang}</span>
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
                {currentIndex + 1 >= TOTAL_PROBLEMS ? t('sessionComplete') : t('next')}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-slate-500">
          {isJapanese ? '問題の生成に失敗しました。もう一度お試しください。' : 'Failed to generate problem. Please try again.'}
        </div>
      )}
    </div>
  );
};
