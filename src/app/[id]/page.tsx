'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Todo as TodoType, getTodoById, toggleTodo, deleteTodo } from '@/lib/todos';
import Todo from '@/components/Todo';

export default function TodoPage({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<TodoType | undefined>();
  const router = useRouter();

  useEffect(() => {
    const foundTodo = getTodoById(params.id);
    if (foundTodo) {
      setTodo(foundTodo);
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  const handleToggle = (id: string) => {
    const updatedTodo = toggleTodo(id);
    if (updatedTodo) {
      setTodo(updatedTodo);
    }
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
    router.push('/');
  };

  if (!todo) {
    return <div>加载中...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">任务详情</h1>
        <Todo {...todo} onToggle={handleToggle} onDelete={handleDelete} />
        <button
          onClick={() => router.back()}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          返回
        </button>
      </div>
    </main>
  );
} 