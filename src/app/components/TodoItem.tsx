import { Todo } from '../types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="card bg-base-200/50 hover:bg-base-200 transition-all duration-200 group animate-fade-in">
      <div className="card-body py-3 px-4 flex-row items-center gap-3">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="checkbox checkbox-primary checkbox-sm"
          />
        </label>
        <div className="flex-1">
          <span 
            className={`block transition-all duration-200 ${
              todo.completed 
                ? 'line-through text-base-content/50' 
                : 'text-base-content'
            }`}
          >
            {todo.text}
          </span>
          <div className="flex gap-2 mt-1">
            {todo.tags.map(tag => (
              <span
                key={tag.id}
                className="badge badge-sm"
                style={{ backgroundColor: tag.color, color: '#fff' }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Delete todo"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
