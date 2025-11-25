import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, AlertCircle, Loader2, Home } from 'lucide-react';
import { TOPICS } from '../constants';
import { useAppContext } from '../App';
import { CodeEditor } from '../components/CodeEditor';
import { checkUserCode } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../locales';

export const PracticeView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { markComplete } = useAppContext();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const topic = TOPICS.find(t => t.id === id);

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ isCorrect: boolean; feedback: string } | null>(null);

  // Get localized content
  const title = topic && language === 'ja' && topic.titleJa ? topic.titleJa : topic?.title;
  const practicePrompt = topic && language === 'ja' && topic.practicePromptJa ? topic.practicePromptJa : topic?.practicePrompt;
  const expectedOutput = topic && language === 'ja' && topic.expectedOutputDescriptionJa ? topic.expectedOutputDescriptionJa : topic?.expectedOutputDescription;

  useEffect(() => {
    if (topic) {
      setCode(topic.starterCode);
    }
  }, [topic]);

  if (!topic) return <div>{t('topicNotFound')}</div>;

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    const feedback = await checkUserCode(title || topic?.title || '', practicePrompt || topic?.practicePrompt || '', code);
    setResult(feedback);
    setLoading(false);
    
    if (feedback.isCorrect) {
      markComplete(topic!.id, 'practice');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link to={`/topic/${topic.id}/read`} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors" title={t('backToReading')}>
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-bold text-slate-800 truncate">{t('practicePrefix')} {title}</h1>
        </div>
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors" title={t('backToHome')}>
           <Home size={20} />
        </Link>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* Left: Task & Feedback */}
        <div className="w-full md:w-1/3 flex flex-col gap-4 overflow-y-auto pb-20">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h3 className="text-blue-900 font-bold mb-2">{t('task')}</h3>
            <p className="text-sm text-blue-800 leading-relaxed">{practicePrompt}</p>
          </div>
          
          <div className="bg-slate-100 rounded-xl p-4">
             <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{t('goal')}</h4>
             <p className="text-xs text-slate-600">{expectedOutput}</p>
          </div>

          {result && (
            <div className={`rounded-xl p-4 border ${result.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} animate-fade-in`}>
              <div className="flex items-center gap-2 mb-2">
                {result.isCorrect ? <CheckCircle className="text-green-600" size={20}/> : <AlertCircle className="text-red-600" size={20}/>}
                <span className={`font-bold ${result.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {result.isCorrect ? t('greatJob') : t('almostThere')}
                </span>
              </div>
              <p className="text-sm text-slate-700">{result.feedback}</p>
            </div>
          )}
        </div>

        {/* Right: Editor */}
        <div className="w-full md:w-2/3 flex flex-col relative h-full">
          <div className="flex-1 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-slate-700 flex flex-col">
             <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-white/10">
                <span className="text-xs text-slate-400 font-mono">Main.kt</span>
                <span className="text-xs text-slate-500">Kotlin 1.9</span>
             </div>
             <div className="flex-1 relative overflow-y-auto">
                <CodeEditor value={code} onChange={setCode} />
             </div>
          </div>
          
          {/* Action Bar */}
          <div className="mt-4 flex justify-end">
             <button
                onClick={handleCheck}
                disabled={loading}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all
                  ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}
                `}
             >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} fill="currentColor" />}
                <span>{loading ? t('analyzing') : t('runAndCheck')}</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};