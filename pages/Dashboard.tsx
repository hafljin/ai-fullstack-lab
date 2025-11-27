import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Code, CheckCircle, ChevronRight, BookOpen } from 'lucide-react';
import { TOPICS } from '../constants';
import { Topic, TopicCategory, CodeReadingProgress } from '../types';
import { useAppContext } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales';
import { getCodeReadingProgress } from '../services/codeReadingStorageService';

export const Dashboard: React.FC = () => {
  const { progress } = useAppContext();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [codeReadingProgress, setCodeReadingProgress] = useState<CodeReadingProgress>({
    weakProblems: [],
    completedSessions: 0,
    totalProblemsAttempted: 0,
    averageScore: 0,
  });

  useEffect(() => {
    setCodeReadingProgress(getCodeReadingProgress());
  }, []);
  
  // ホーム画面はジャンルとコースのみ表示
  const genre = {
    key: 'mobile-dev',
    label: language === 'ja' ? 'モバイル開発スキル獲得' : 'Mobile Development Skills',
    courses: [
      {
        key: TopicCategory.MOBILE_KOTLIN,
        label: language === 'ja' ? 'Kotlinコース' : 'Kotlin Course',
        to: '/course/kotlin'
      }
    ]
  };

  const getCategoryTopics = (cat: TopicCategory) => TOPICS.filter(t => t.category === cat);

  const TopicCard = ({ topic }: { topic: Topic }) => {
    const isRead = progress.read.includes(topic.id);
    const isPracticed = progress.practiced.includes(topic.id);
    
    const title = language === 'ja' && topic.titleJa ? topic.titleJa : topic.title;
    const description = language === 'ja' && topic.descriptionJa ? topic.descriptionJa : topic.description;
    
    return (
      <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-4">
        {/* Top Content Area - Expands to fill space */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
               <h3 className="font-semibold text-slate-800 leading-tight">{title}</h3>
               <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full mt-2 inline-block">
                 {topic.difficulty}
               </span>
            </div>
            <div className="flex space-x-1 flex-shrink-0 ml-2">
               {isRead && <CheckCircle size={16} className="text-green-500" />}
               {isPracticed && <Code size={16} className="text-blue-500" />}
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-4 line-clamp-3">{description}</p>
        </div>
        
        {/* Buttons - Always at the bottom */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
          <Link 
            to={`/topic/${topic.id}/read`}
            className={`flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-colors ${isRead ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
          >
            <Book size={16} />
            <span>{t('read')}</span>
          </Link>
          <Link 
            to={`/topic/${topic.id}/practice`}
            className={`flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-colors ${isPracticed ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'}`}
          >
            <Code size={16} />
            <span>{t('practice')}</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">{t('welcomeBack')}</h2>
        <p className="opacity-90 mb-4">{t('progressMessage', { count: progress.practiced.length })}</p>
        
        <div className="flex space-x-4 text-sm font-medium">
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
             📚 {progress.read.length} {t('read')}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
             💻 {progress.practiced.length} {t('practiced')}
          </div>
        </div>
      </div>

      {/* Code Reading Enhancement Section */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-emerald-700 mb-6 border-b border-emerald-200 pb-2">
          {language === 'ja' ? 'スキル強化' : 'Skill Enhancement'}
        </h2>
        <Link
          to="/code-reading"
          className="block bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6 hover:from-emerald-100 hover:to-teal-100"
        >
          <div className="flex items-start gap-4">
            <div className="bg-emerald-500 text-white p-3 rounded-xl">
              <BookOpen size={28} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800 mb-1">{t('codeReadingTitle')}</h3>
              <p className="text-sm text-slate-600 mb-3">{t('codeReadingDesc')}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {codeReadingProgress.completedSessions > 0 && (
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    {language === 'ja' 
                      ? `${codeReadingProgress.completedSessions}セッション完了` 
                      : `${codeReadingProgress.completedSessions} sessions completed`}
                  </span>
                )}
                {codeReadingProgress.weakProblems.length > 0 && (
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    {language === 'ja' 
                      ? `${codeReadingProgress.weakProblems.length}問の復習待ち` 
                      : `${codeReadingProgress.weakProblems.length} problems to review`}
                  </span>
                )}
                {codeReadingProgress.averageScore > 0 && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {language === 'ja' 
                      ? `平均スコア: ${Math.round(codeReadingProgress.averageScore)}%` 
                      : `Avg. Score: ${Math.round(codeReadingProgress.averageScore)}%`}
                  </span>
                )}
              </div>
            </div>
            <ChevronRight size={24} className="text-emerald-600 self-center" />
          </div>
        </Link>
      </section>

      <section key={genre.key} className="mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-6 border-b border-blue-200 pb-2">{genre.label}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {genre.courses.map(course => (
            <Link
              key={course.key}
              to={course.to}
              className="block bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6 hover:bg-blue-50"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center">
                {course.label}
              </h3>
              <span className="text-xs font-normal text-slate-400">{getCategoryTopics(course.key).length} {t('lessons')}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};