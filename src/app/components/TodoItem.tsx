import { Todo } from '../types';

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
        <span 
          className={`flex-1 transition-all duration-200 ${
            todo.completed 
              ? 'line-through text-base-content/50' 
              : 'text-base-content'
          }`}
        >
          {todo.text}
        </span>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Delete todo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
