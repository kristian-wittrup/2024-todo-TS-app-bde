import type { Todo } from './main';

// Calculate the percentage of completed tasks.
export const calculateProgress = (todos: Todo[]): number => {
  // An empty list has zero progress.
  if (todos.length === 0) {
    return 0;
  }

  const completedCount = todos.filter(todo => todo.completed).length;

  // Round the result to a whole number.
  return Math.round((completedCount / todos.length) * 100);
};