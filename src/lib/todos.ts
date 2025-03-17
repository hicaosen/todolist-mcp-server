export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// 模拟数据存储
let todos: Todo[] = [
  { id: '1', title: '学习 Next.js', completed: false },
  { id: '2', title: '理解 App Router', completed: false },
  { id: '3', title: '构建示例应用', completed: false },
];

export function getAllTodos(): Todo[] {
  return todos;
}

export function getTodoById(id: string): Todo | undefined {
  return todos.find(todo => todo.id === id);
}

export function addTodo(title: string): Todo {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
}

export function toggleTodo(id: string): Todo | undefined {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  return todo;
}

export function deleteTodo(id: string): void {
  todos = todos.filter(todo => todo.id !== id);
} 