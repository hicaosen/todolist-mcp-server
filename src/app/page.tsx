'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Todo from '@/components/Todo';
import { Todo as TodoType, getAllTodos, deleteTodo, toggleTodo, getTodoStats, updateTodo, Status } from '@/lib/todos';

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [stats, setStats] = useState<ReturnType<typeof getTodoStats>>();
  const [filter, setFilter] = useState<{
    priority?: 'low' | 'medium' | 'high';
    category?: string;
    status?: Status;
    tag?: string;
    assignee?: string;
    dateRange?: 'today' | 'week' | 'month' | 'all';
  }>({ status: 'pending' });

  useEffect(() => {
    const loadTodos = () => {
      const allTodos = getAllTodos();
      setTodos(allTodos.filter(todo => {
        if (filter.priority && todo.priority !== filter.priority) return false;
        if (filter.category && todo.category !== filter.category) return false;
        if (filter.status && todo.status !== filter.status) return false;
        if (filter.tag && !todo.tags?.includes(filter.tag)) return false;
        if (filter.assignee && todo.assignee !== filter.assignee) return false;
        if (filter.dateRange) {
          const today = new Date();
          const dueDate = todo.dueDate ? new Date(todo.dueDate) : null;
          if (!dueDate) return false;
          
          switch (filter.dateRange) {
            case 'today':
              return dueDate.toDateString() === today.toDateString();
            case 'week':
              const weekLater = new Date(today);
              weekLater.setDate(today.getDate() + 7);
              return dueDate <= weekLater;
            case 'month':
              const monthLater = new Date(today);
              monthLater.setMonth(today.getMonth() + 1);
              return dueDate <= monthLater;
            default:
              return true;
          }
        }
        return true;
      }));
      setStats(getTodoStats());
    };
    loadTodos();
  }, [filter]);

  const handleToggle = (id: string) => {
    toggleTodo(id);
    setTodos(getAllTodos());
    setStats(getTodoStats());
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
    setTodos(getAllTodos());
    setStats(getTodoStats());
  };

  const handleStatusChange = (id: string, status: Status) => {
    updateTodo(id, { status });
    setTodos(getAllTodos());
    setStats(getTodoStats());
  };

  const handleUpdate = (id: string, updates: Partial<TodoType>) => {
    updateTodo(id, updates);
    setTodos(getAllTodos());
    setStats(getTodoStats());
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to bg-clip-text text-transparent">
                待办事项列表
              </h1>
              <p className="mt-2 text-base-content/60">
                高效管理您的任务，提升工作效率
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const jsonStr = `data:text/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify({ todos, stats }, null, 2)
                  )}`;
                  const link = document.createElement('a');
                  link.href = jsonStr;
                  link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
                  link.click();
                }}
                className="btn btn-outline btn-primary"
              >
                导出数据
              </button>
              <Link
                href="/add"
                className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to border-0 hover:scale-105"
              >
                添加新任务
              </Link>
            </div>
          </div>

          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="stat bg-base-200/50 rounded-xl backdrop-blur-sm p-4">
                <div className="stat-title">总任务</div>
                <div className="stat-value">{stats.total}</div>
                <div className="stat-desc">
                  活跃任务: {stats.byStatus.in_progress}
                </div>
              </div>
              <div className="stat bg-base-200/50 rounded-xl backdrop-blur-sm p-4">
                <div className="stat-title">已完成</div>
                <div className="stat-value text-success">{stats.byStatus.completed}</div>
                <div className="stat-desc">
                  完成率: {Math.round(stats.completionRate)}%
                </div>
              </div>
              <div className="stat bg-base-200/50 rounded-xl backdrop-blur-sm p-4">
                <div className="stat-title">待完成</div>
                <div className="stat-value text-warning">{stats.byStatus.pending}</div>
                <div className="stat-desc">
                  高优先级: {stats.byPriority.high}
                </div>
              </div>
              <div className="stat bg-base-200/50 rounded-xl backdrop-blur-sm p-4">
                <div className="stat-title">预计时间</div>
                <div className="stat-value">
                  {Math.round(stats.estimatedTime / 60)}h
                </div>
                <div className="stat-desc">
                  实际: {Math.round(stats.actualTime / 60)}h
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mb-8">
            <select
              className="select select-bordered"
              value={filter.status || ''}
              onChange={(e) => setFilter(prev => ({ 
                ...prev, 
                status: e.target.value as Status | undefined 
              }))}
            >
              <option value="">全部状态</option>
              <option value="pending">待处理</option>
              <option value="in_progress">进行中</option>
              <option value="completed">已完成</option>
              <option value="archived">已归档</option>
            </select>

            <select
              className="select select-bordered"
              value={filter.priority || ''}
              onChange={(e) => setFilter(prev => ({ 
                ...prev, 
                priority: e.target.value as 'low' | 'medium' | 'high' | undefined 
              }))}
            >
              <option value="">全部优先级</option>
              <option value="high">高优先级</option>
              <option value="medium">中优先级</option>
              <option value="low">低优先级</option>
            </select>

            {stats && Object.keys(stats.byCategory).length > 0 && (
              <select
                className="select select-bordered"
                value={filter.category || ''}
                onChange={(e) => setFilter(prev => ({ 
                  ...prev, 
                  category: e.target.value || undefined 
                }))}
              >
                <option value="">全部分类</option>
                {Object.keys(stats.byCategory).map(category => (
                  <option key={category} value={category}>
                    {category} ({stats.byCategory[category]})
                  </option>
                ))}
              </select>
            )}

            <select
              className="select select-bordered"
              value={filter.dateRange || 'all'}
              onChange={(e) => setFilter(prev => ({ 
                ...prev, 
                dateRange: e.target.value as 'today' | 'week' | 'month' | 'all' 
              }))}
            >
              <option value="all">全部时间</option>
              <option value="today">今天到期</option>
              <option value="week">本周到期</option>
              <option value="month">本月到期</option>
            </select>
          </div>

          <div className="card bg-card-background shadow-2xl backdrop-blur-xl border border-card-border">
            <div className="card-body p-8">
              <div className="space-y-6">
                {todos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <div className="text-xl text-base-content/60">
                      暂无待办事项
                    </div>
                    <div className="text-sm text-base-content/40 mt-2">
                      点击右上角按钮添加新任务开始使用
                    </div>
                  </div>
                ) : (
                  todos.map(todo => (
                    <Todo
                      key={todo.id}
                      {...todo}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                      onUpdate={handleUpdate}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
