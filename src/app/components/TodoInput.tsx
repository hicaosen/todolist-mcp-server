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
    <form onSubmit={handleSubmit} >
      <div className="w-full">
      <textarea value={input} rows={1} onChange={(e) => setInput(e.target.value)} placeholder={t('placeholder')} className="textarea"></textarea>
      </div>
    </form>
  );
}
