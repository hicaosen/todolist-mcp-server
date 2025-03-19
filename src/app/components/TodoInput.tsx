import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const { t } = useLanguage();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4">
      <div className="relative">
      <textarea 
        value={input} 
        rows={1} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder={t('placeholder')} 
        className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm hover:shadow transition-shadow"
      />
      </div>
    </form>
  );
}
