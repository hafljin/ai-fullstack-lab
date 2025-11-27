
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  language?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language = 'kotlin', readOnly = false }) => {
  // TODO: Kotlin用ハイライトは後で追加
  return (
    <div className="w-full h-64 rounded-lg border border-slate-700 overflow-hidden">
      <CodeMirror
        value={value}
        onChange={onChange}
        height="100%"
        theme="dark"
        readOnly={readOnly}
        basicSetup={{ lineNumbers: true, highlightActiveLine: true }}
        style={{ fontFamily: 'monospace', fontSize: 14 }}
      />
    </div>
  );
};
