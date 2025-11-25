import React, { useState, useEffect } from 'react';

// We need to declare Prism strictly because it's loaded via CDN in index.html
declare const Prism: any;

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  language?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language = 'kotlin', readOnly = false }) => {
  const [highlightedHtml, setHighlightedHtml] = useState('');

  useEffect(() => {
    if (typeof Prism !== 'undefined') {
      const grammar = Prism.languages[language] || Prism.languages.clike;
      const html = Prism.highlight(value, grammar, language);
      setHighlightedHtml(html);
    } else {
      setHighlightedHtml(value.replace(/</g, '&lt;'));
    }
  }, [value, language]);

  return (
    <div className="relative font-mono text-sm leading-6 bg-[#2d2d2d] rounded-lg overflow-hidden border border-slate-700 shadow-inner group">
      {/* Background Highlight Layer */}
      <pre 
        className="absolute top-0 left-0 w-full h-full m-0 p-4 pointer-events-none whitespace-pre-wrap break-words text-transparent"
        style={{ fontFamily: 'monospace' }}
        aria-hidden="true"
      >
        <code 
          className={`language-${language} text-white`}
          dangerouslySetInnerHTML={{ __html: highlightedHtml + '<br />' }} 
        />
      </pre>

      {/* Foreground Input Layer */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className={`relative w-full h-64 p-4 bg-transparent text-white caret-white resize-none outline-none focus:ring-2 focus:ring-blue-500/50 ${readOnly ? 'opacity-0' : 'text-transparent'}`}
        style={{ 
          fontFamily: 'monospace',
          color: readOnly ? 'transparent' : 'transparent', // Text needs to be transparent so highlights show through
          caretColor: 'white'
        }}
      />
      {readOnly && (
         <div className="absolute inset-0 pointer-events-none p-4">
             <code 
                className={`language-${language}`}
                dangerouslySetInnerHTML={{ __html: highlightedHtml }} 
            />
         </div>
      )}
    </div>
  );
};
