'use client';

import { useState } from 'react';
import { Todo, TodoTag } from './types';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Sidebar, FilterType } from './components/Sidebar';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('today');

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

  const filteredTodos = todos.filter(todo => {
    switch (currentFilter) {
      case 'today':
        const today = new Date();
        return todo.id >= today.setHours(0, 0, 0, 0);
      case 'week':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return todo.id >= weekAgo.getTime();
      case 'work':
        return todo.tags.some(tag => tag.id === 'work');
      case 'personal':
        return todo.tags.some(tag => tag.id !== 'work');
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen flex">
      <Sidebar currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
      <div className="flex-1 p-4 md:p-8 flex items-start justify-center">
        <div className="w-full max-w-2xl">
          <div className="card bg-base-100 shadow-xl backdrop-blur-sm">
            <div className="card-body p-6 md:p-8">
              <TodoInput onAdd={handleAddTodo} />
              <TodoList
                todos={filteredTodos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
