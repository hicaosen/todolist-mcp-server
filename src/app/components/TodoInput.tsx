import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

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
      <div className="relative flex items-center gap-2 bg-base-200 rounded-lg p-2 ring-2 ring-base-300 focus-within:ring-2 focus-within:ring-primary transition-all duration-200">
        <textarea
          value={input}
          rows={1}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('placeholder')}
          className="flex-1 bg-transparent border-none outline-none resize-none py-2 px-3 text-base-content placeholder:text-base-content/50"
        />
        <button
          type="submit"
          aria-label="Add todo"
          className="btn btn-circle btn-primary btn-sm hover:btn-primary-focus transition-all duration-200"
        >
          <PaperAirplaneIcon className="w-4 h-4 text-white" />
        </button>
      </div>
    </form>
  );
}
