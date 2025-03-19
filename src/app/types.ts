export type TodoTag = {
  id: string;
  name: string;
  color: string;
};

export const DEFAULT_TAGS: TodoTag[] = [
  { id: 'work', name: 'tag_work', color: '#0ea5e9' },
  { id: 'study', name: 'tag_study', color: '#8b5cf6' },
  { id: 'life', name: 'tag_life', color: '#22c55e' },
  { id: 'other', name: 'tag_other', color: '#94a3b8' }
];

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
