import { todos, Todo } from './todos';
import { renderTodos } from './todoRender';

export const addTodo = (text: string): Todo => {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false
  };
  todos.push(newTodo);
  renderTodos();
  return newTodo;
};

// Toggle completed status
export const toggleCompleted = (id: number): void => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
};

// Clear all completed todos
export const clearCompletedTodos = (): void => {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].completed) {
      todos.splice(i, 1);
    }
  }
  renderTodos();
};

// Edit a todo (existing)
export const editTodo = (id: number, newText: string): void => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.text = newText;
    renderTodos();
  }
};

// Remove a todo by ID
export const removeTodo = (id: number): void => {
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodos();
  }
};

export const toggleFavorite = (id: number): void => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.favorite = !todo.favorite;
    renderTodos();
  }
};

export const duplicateTodo = (id: number): void => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    const newTodo: Todo = {
      id: Date.now(),
      text: `${todo.text} (copy)`,
      completed: false,
      favorite: todo.favorite || false
    };
    todos.push(newTodo);
    renderTodos();
  }
};

export const copyTodoText = (id: number): void => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    navigator.clipboard.writeText(todo.text)
      .then(() => {
        alert(`Copied: "${todo.text}"`);
      })
      .catch(() => {
        alert('Failed to copy text');
      });
  }
};
