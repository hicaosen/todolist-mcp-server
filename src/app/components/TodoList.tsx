
import { Todo } from '../types';
import { TodoItem } from './TodoItem';
import { useLanguage } from '../i18n/LanguageContext';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const { t } = useLanguage();
  if (todos.length === 0) {
    return (
      <div className="alert alert-info">
        <span>{t('emptyTodoList')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
