import React from 'react';
import { Link } from 'react-router-dom';
import { TOPICS } from '../constants';
import { useAppContext } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales';

export const CourseKotlin: React.FC = () => {
  const { progress } = useAppContext();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const kotlinTopics = TOPICS.filter(t => t.category === 'Kotlin (モバイル開発)');

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">{language === 'ja' ? 'Kotlinコース' : 'Kotlin Course'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kotlinTopics.map(topic => (
          <Link
            key={topic.id}
            to={`/topic/${topic.id}/read`}
            className="block bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6 hover:bg-blue-50"
          >
            <h3 className="font-bold text-slate-800 mb-2">{language === 'ja' && topic.titleJa ? topic.titleJa : topic.title}</h3>
            <span className="text-xs font-normal text-slate-400">{topic.difficulty}</span>
            <p className="text-sm text-slate-500 mt-2 line-clamp-2">{language === 'ja' && topic.descriptionJa ? topic.descriptionJa : topic.description}</p>
            <div className="mt-3 flex gap-2">
              {progress.read.includes(topic.id) && <span className="text-green-600 text-xs">{t('read')}</span>}
              {progress.practiced.includes(topic.id) && <span className="text-blue-600 text-xs">{t('practiced')}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
