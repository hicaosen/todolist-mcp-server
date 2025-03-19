export type TodoTag = {
  id: string;
  name: string;
  color: string;
};

export const DEFAULT_TAGS: TodoTag[] = [
  { id: 'work', name: '工作', color: '#0ea5e9' },
  { id: 'study', name: '学习', color: '#8b5cf6' },
  { id: 'life', name: '生活', color: '#22c55e' },
  { id: 'other', name: '其他', color: '#94a3b8' }
];

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  tags: TodoTag[];
}
