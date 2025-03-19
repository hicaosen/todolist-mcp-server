'use client';

import { useState } from 'react';
import { Todo, TodoTag } from './types';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { useLanguage } from './i18n/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string, selectedTags: TodoTag[]) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      tags: selectedTags
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="card bg-base-100 shadow-xl backdrop-blur-sm">
          <div className="card-body p-6 md:p-8">
            <h1 className="card-title text-3xl md:text-4xl font-bold justify-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <TodoInput onAdd={handleAddTodo} />
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
