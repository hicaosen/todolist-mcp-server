'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Todo from '@/components/Todo';
import { Todo as TodoType, getAllTodos, deleteTodo, toggleTodo } from '@/lib/todos';

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    setTodos(getAllTodos());
  }, []);

  const handleToggle = (id: string) => {
    toggleTodo(id);
    setTodos(getAllTodos());
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
    setTodos(getAllTodos());
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">待办事项列表</h1>
          <Link
            href="/add"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            添加新任务
          </Link>
        </div>
        <div className="space-y-4">
          {todos.map(todo => (
            <Todo
              key={todo.id}
              {...todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
