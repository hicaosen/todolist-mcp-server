'use client';

import { useState } from 'react';

interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function Todo({ id, title, completed, onToggle, onDelete }: TodoProps) {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
    onToggle?.(id);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-2">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
          className="w-4 h-4 text-blue-600 dark:text-blue-500 rounded focus:ring-blue-500"
        />
        <span className={`${isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
          {title}
        </span>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          删除
        </button>
      )}
    </div>
  );
} 