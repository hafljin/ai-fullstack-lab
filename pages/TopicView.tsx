import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, MessageCircle, ArrowRight } from 'lucide-react';
import { TOPICS } from '../constants';
import { useAppContext } from '../App';
import { explainConcept } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales';

declare const Prism: any;

export const TopicView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { markComplete } = useAppContext();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const topic = TOPICS.find(t => t.id === id);
  
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Get localized content
  const title = topic && language === 'ja' && topic.titleJa ? topic.titleJa : topic?.title;
  const content = topic && language === 'ja' && topic.contentMarkdownJa ? topic.contentMarkdownJa : topic?.contentMarkdown;

  useEffect(() => {
    if (topic && typeof Prism !== 'undefined') {
      setTimeout(() => Prism.highlightAll(), 100);
    }
  }, [topic, aiResponse, content]);

  if (!topic) return <div className="text-center py-10">{t('topicNotFound')}</div>;

  const handleFinish = () => {
    markComplete(topic.id, 'read');
    navigate(`/topic/${topic.id}/practice`);
  };

  const handleAskAI = async () => {
    if (!aiQuery.trim()) return;
    setLoading(true);
    const answer = await explainConcept(aiQuery, content || topic?.contentMarkdown);
    setAiResponse(answer);
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Breadcrumb / Header */}
      <div className="flex items-center space-x-4 mb-4">
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
           <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">{topic.category}</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 prose prose-slate max-w-none prose-code:text-blue-600 prose-pre:bg-[#2d2d2d]">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* AI Tutor Section */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
        <h3 className="text-indigo-900 font-semibold flex items-center gap-2 mb-3">
          <MessageCircle size={18} />
          {t('aiTutor')}
        </h3>
        <div className="flex gap-2 mb-3">
          <input 
            type="text" 
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder={t('aiPlaceholder')}
            className="flex-1 border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            onClick={handleAskAI}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {loading ? t('loading') : t('ask')}
          </button>
        </div>
        {aiResponse && (
          <div className="text-sm text-slate-700 bg-white p-4 rounded-lg border border-indigo-100 animate-fade-in">
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* Next Step */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:relative md:bg-transparent md:border-0 md:p-0 z-40">
        <button 
          onClick={handleFinish}
          className="w-full bg-slate-900 text-white font-medium py-3 rounded-xl shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
        >
          <span>{t('markAsRead')}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};