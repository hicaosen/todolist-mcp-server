export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'in_progress' | 'completed' | 'archived';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface TodoTemplate {
  id: string;
  name: string;
  description?: string;
  priority: Priority;
  category?: string;
  estimatedTime?: number; // 预计完成时间（分钟）
  tags?: string[];
  checklistItems?: string[];
}

export interface Todo {
  id: string;
  title: string;
  status: Status;
  description?: string;
  priority: Priority;
  category?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  tags?: string[];
  assignee?: string;
  watchers?: string[];
  parent?: string; // 父任务ID
  subtasks?: string[]; // 子任务ID列表
  order: number; // 用于拖拽排序
  estimatedTime?: number;
  actualTime?: number;
  checklistItems?: {
    id: string;
    content: string;
    completed: boolean;
  }[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  comments?: {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
  }[];
  history?: {
    id: string;
    type: 'created' | 'updated' | 'status_changed' | 'assigned' | 'commented';
    timestamp: string;
    userId: string;
    changes?: {
      field: string;
      oldValue: any;
      newValue: any;
    }[];
  }[];
}

// 模拟数据存储
let todos: Todo[] = [
  { 
    id: '1', 
    title: '学习 Next.js', 
    status: 'in_progress',
    priority: 'high',
    category: '学习',
    description: '深入学习 Next.js 的 App Router 和 Server Components',
    dueDate: '2024-03-20',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    order: 0,
    tags: ['前端', '技术学习'],
    checklistItems: [
      { id: '1', content: '学习 App Router 基础概念', completed: false },
      { id: '2', content: '理解 Server Components', completed: false },
      { id: '3', content: '掌握数据获取方式', completed: false }
    ]
  },
  { 
    id: '2', 
    title: '理解 App Router', 
    status: 'pending',
    priority: 'medium',
    category: '学习',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    order: 1,
    parent: '1'
  },
  { 
    id: '3', 
    title: '构建示例应用', 
    status: 'pending',
    priority: 'low',
    category: '项目',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    order: 2,
    estimatedTime: 120
  },
];

let tags: Tag[] = [
  { id: '1', name: '前端', color: '#3b82f6' },
  { id: '2', name: '技术学习', color: '#10b981' },
  { id: '3', name: '项目', color: '#f59e0b' }
];

let templates: TodoTemplate[] = [];

// 本地存储相关函数
const STORAGE_KEY = 'todo_app_data';

function saveToLocalStorage() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos, tags, templates }));
  }
}

function loadFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      todos = parsed.todos || [];
      tags = parsed.tags || [];
      templates = parsed.templates || [];
    }
  }
}

// 初始化加载
loadFromLocalStorage();

// 任务相关函数
export function getAllTodos(): Todo[] {
  return todos.sort((a, b) => a.order - b.order);
}

export function getTodoById(id: string): Todo | undefined {
  return todos.find(todo => todo.id === id);
}

export function getSubtasks(parentId: string): Todo[] {
  return todos.filter(todo => todo.parent === parentId);
}

export function addTodo(todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>): Todo {
  const maxOrder = Math.max(...todos.map(t => t.order), -1);
  const newTodo: Todo = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: maxOrder + 1,
    status: 'pending',
    ...todoData,
  };
  todos.push(newTodo);
  saveToLocalStorage();
  return newTodo;
}

export function updateTodo(id: string, updates: Partial<Todo>): Todo | undefined {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    Object.assign(todo, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    saveToLocalStorage();
  }
  return todo;
}

export function toggleTodo(id: string): Todo | undefined {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    todo.status = newStatus;
    todo.updatedAt = new Date().toISOString();
    if (newStatus === 'completed') {
      todo.completedAt = new Date().toISOString();
    } else {
      todo.completedAt = undefined;
    }
    saveToLocalStorage();
  }
  return todo;
}

export function deleteTodo(id: string): void {
  todos = todos.filter(todo => todo.id !== id);
  saveToLocalStorage();
}

export function reorderTodos(todoIds: string[]): void {
  todoIds.forEach((id, index) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.order = index;
    }
  });
  saveToLocalStorage();
}

// 标签相关函数
export function getAllTags(): Tag[] {
  return tags;
}

export function addTag(name: string, color: string): Tag {
  const newTag: Tag = {
    id: Date.now().toString(),
    name,
    color
  };
  tags.push(newTag);
  saveToLocalStorage();
  return newTag;
}

// 模板相关函数
export function getAllTemplates(): TodoTemplate[] {
  return templates;
}

export function addTemplate(template: Omit<TodoTemplate, 'id'>): TodoTemplate {
  const newTemplate: TodoTemplate = {
    id: Date.now().toString(),
    ...template
  };
  templates.push(newTemplate);
  saveToLocalStorage();
  return newTemplate;
}

// 统计相关函数
export function getTodoStats() {
  const total = todos.length;
  const byStatus = {
    pending: todos.filter(t => t.status === 'pending').length,
    in_progress: todos.filter(t => t.status === 'in_progress').length,
    completed: todos.filter(t => t.status === 'completed').length,
    archived: todos.filter(t => t.status === 'archived').length,
  };
  const byPriority = {
    high: todos.filter(t => t.priority === 'high').length,
    medium: todos.filter(t => t.priority === 'medium').length,
    low: todos.filter(t => t.priority === 'low').length,
  };
  const byCategory = todos.reduce((acc, todo) => {
    if (todo.category) {
      acc[todo.category] = (acc[todo.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const completionRate = total ? (byStatus.completed / total) * 100 : 0;
  const estimatedTime = todos.reduce((acc, todo) => acc + (todo.estimatedTime || 0), 0);
  const actualTime = todos.reduce((acc, todo) => acc + (todo.actualTime || 0), 0);

  return {
    total,
    byStatus,
    byPriority,
    byCategory,
    completionRate,
    estimatedTime,
    actualTime,
  };
}

// 导出相关函数
export function exportTodos() {
  const data = {
    todos,
    tags,
    templates,
    exportedAt: new Date().toISOString(),
    version: '1.0.0'
  };
  return JSON.stringify(data, null, 2);
}

// 导入相关函数
export function importTodos(jsonData: string) {
  try {
    const data = JSON.parse(jsonData);
    if (data.version === '1.0.0') {
      todos = data.todos || [];
      tags = data.tags || [];
      templates = data.templates || [];
      saveToLocalStorage();
      return true;
    }
    return false;
  } catch {
    return false;
  }
} 