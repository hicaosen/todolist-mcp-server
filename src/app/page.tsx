'use client';

import { useState } from 'react';
import { Todo } from './types';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Sidebar, FilterType } from './components/Sidebar';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('today');

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
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
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen flex">
      <Sidebar currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
      <div className="flex-1 p-4 md:p-8 flex flex-col">
        <div className="w-full max-w-2xl flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <TodoList
              todos={filteredTodos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          </div>
          <div className="sticky bottom-0 bg-base-100 pt-4">
            <TodoInput onAdd={handleAddTodo} />
          </div>
        </div>
      </div>
    </div>
  );
}
