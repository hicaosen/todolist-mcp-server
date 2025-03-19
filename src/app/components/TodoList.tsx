
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
      <div className="w-full flex justify-center items-center py-12 animate-fade-in">
        <div className="card bg-base-200 shadow-lg w-full max-w-md">
          <div className="card-body items-center text-center py-8">
            <div className="text-5xl mb-4">✨</div>
            <span className="text-base-content/70 text-lg">{t('emptyTodoList')}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
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
