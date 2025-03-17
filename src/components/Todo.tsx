'use client';

import { useState } from 'react';
import { Status, Priority } from '@/lib/todos';

interface TodoProps {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category?: string;
  dueDate?: string;
  status: Status;
  tags?: string[];
  assignee?: string;
  checklistItems?: {
    id: string;
    content: string;
    completed: boolean;
  }[];
  estimatedTime?: number;
  actualTime?: number;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: Status) => void;
  onUpdate?: (id: string, updates: Partial<TodoProps>) => void;
}

const priorityColors = {
  high: 'text-red-500 bg-red-500/10',
  medium: 'text-yellow-500 bg-yellow-500/10',
  low: 'text-green-500 bg-green-500/10',
};

const priorityIcons = {
  high: '🔴',
  medium: '🟡',
  low: '🟢',
};

const statusColors = {
  pending: 'bg-gray-500/10 text-gray-500',
  in_progress: 'bg-blue-500/10 text-blue-500',
  completed: 'bg-green-500/10 text-green-500',
  archived: 'bg-gray-500/10 text-gray-500',
};

const statusLabels = {
  pending: '待处理',
  in_progress: '进行中',
  completed: '已完成',
  archived: '已归档',
};

export default function Todo({ 
  id, 
  title, 
  description, 
  priority,
  category,
  dueDate,
  status,
  tags = [],
  assignee,
  checklistItems = [],
  estimatedTime,
  actualTime,
  onToggle, 
  onDelete,
  onStatusChange,
  onUpdate
}: TodoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleToggle = () => {
    onToggle?.(id);
  };

  const handleStatusChange = (newStatus: Status) => {
    onStatusChange?.(id, newStatus);
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim() && onUpdate) {
      onUpdate(id, { title: editedTitle });
      setIsEditing(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    }).format(date);
  };

  const formatTime = (minutes?: number) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}小时${mins}分钟`;
  };

  const calculateProgress = () => {
    if (!checklistItems.length) return 0;
    const completed = checklistItems.filter(item => item.completed).length;
    return Math.round((completed / checklistItems.length) * 100);
  };

  return (
    <div className="group animate-fade-in">
      <div className="flex flex-col p-5 bg-gradient-to-r from-white/5 to-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-white/10 hover:border-primary/30 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className="relative mt-1" onClick={e => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={status === 'completed'}
                onChange={handleToggle}
                className="checkbox checkbox-primary border-2 transition-all duration-300"
              />
              {status === 'completed' && (
                <div className="absolute inset-0 bg-primary/20 rounded-md animate-ping" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                    className="input input-bordered input-sm flex-1"
                    autoFocus
                  />
                ) : (
                  <span 
                    className={`text-lg transition-all duration-300 ${
                      status === 'completed' 
                        ? 'line-through text-base-content/50 italic' 
                        : 'text-base-content hover:text-primary'
                    }`}
                    onDoubleClick={() => setIsEditing(true)}
                  >
                    {title}
                  </span>
                )}
                <span 
                  title={`优先级: ${priority}`} 
                  className={`px-2 py-0.5 rounded-full text-xs ${priorityColors[priority]}`}
                >
                  {priorityIcons[priority]} {priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}
                </span>
                <span 
                  className={`px-2 py-0.5 rounded-full text-xs ${statusColors[status]}`}
                >
                  {statusLabels[status]}
                </span>
                {category && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {category}
                  </span>
                )}
              </div>

              {(dueDate || estimatedTime || assignee) && (
                <div className="flex items-center gap-4 mt-2 text-sm text-base-content/60">
                  {dueDate && (
                    <span className="flex items-center gap-1">
                      📅 {formatDate(dueDate)}
                    </span>
                  )}
                  {estimatedTime && (
                    <span className="flex items-center gap-1">
                      ⏱️ 预计: {formatTime(estimatedTime)}
                    </span>
                  )}
                  {actualTime && (
                    <span className="flex items-center gap-1">
                      ⌛ 实际: {formatTime(actualTime)}
                    </span>
                  )}
                  {assignee && (
                    <span className="flex items-center gap-1">
                      👤 {assignee}
                    </span>
                  )}
                </div>
              )}

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/5 text-primary/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {checklistItems.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-base-content/60">
                      进度: {calculateProgress()}%
                    </span>
                  </div>
                  <div className="w-full bg-base-300 rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all duration-300"
                      style={{ width: `${calculateProgress()}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-sm">
                状态
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {Object.entries(statusLabels).map(([key, label]) => (
                  <li key={key}>
                    <a 
                      onClick={() => handleStatusChange(key as Status)}
                      className={status === key ? 'active' : ''}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {onDelete && (
              <button
                onClick={() => onDelete(id)}
                className="btn btn-ghost btn-sm text-error opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-error/10 hover:text-error-focus"
              >
                删除
              </button>
            )}
            <button 
              className="btn btn-ghost btn-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '收起' : '展开'}
            </button>
          </div>
        </div>

        {isExpanded && (description || checklistItems.length > 0) && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {description && (
              <div className="p-4 bg-base-200/50 rounded-lg text-sm text-base-content/80">
                {description}
              </div>
            )}
            {checklistItems.length > 0 && (
              <div className="space-y-2">
                {checklistItems.map(item => (
                  <div 
                    key={item.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200/30"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => {
                        const updatedItems = checklistItems.map(i => 
                          i.id === item.id ? { ...i, completed: !i.completed } : i
                        );
                        onUpdate?.(id, { checklistItems: updatedItems });
                      }}
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                    <span className={item.completed ? 'line-through text-base-content/50' : ''}>
                      {item.content}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 