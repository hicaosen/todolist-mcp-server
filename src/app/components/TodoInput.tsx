import { useState } from 'react';
import { TodoTag, DEFAULT_TAGS } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface TodoInputProps {
  onAdd: (text: string, selectedTags: TodoTag[]) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<TodoTag[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim(), selectedTags);
      setInput('');
      setSelectedTags([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="join w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('placeholder')}
          className="input input-bordered join-item flex-1 focus:outline-none focus:border-primary"
        />
        <button 
          type="submit" 
          className="btn join-item bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-content border-0"
        >
          {t('addTodo')}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {DEFAULT_TAGS.map(tag => (
          <label
            key={tag.id}
            className="cursor-pointer flex items-center"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-xs mr-1"
              checked={selectedTags.some(t => t.id === tag.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTags([...selectedTags, tag]);
                } else {
                  setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
                }
              }}
            />
            <span
              className="badge badge-sm"
              style={{ backgroundColor: tag.color, color: '#fff' }}
            >
              {t(tag.name)}
            </span>
          </label>
        ))}
      </div>
    </form>
  );
}
