'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addTodo } from '@/lib/todos';

export default function AddTodo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: '',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      addTodo({
        ...formData,
        completed: false,
      });
      router.push('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">添加新任务</h1>
          <div className="card bg-card-background shadow-2xl backdrop-blur-xl border border-card-border">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">任务标题</span>
                    <span className="label-text-alt text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="输入任务标题..."
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">任务描述</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-24"
                    placeholder="输入任务描述..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">优先级</span>
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                    >
                      <option value="high">高优先级</option>
                      <option value="medium">中优先级</option>
                      <option value="low">低优先级</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">分类</span>
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="输入任务分类..."
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">截止日期</span>
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn btn-ghost"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    添加
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 