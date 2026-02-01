// todos.ts
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  favorite?: boolean;
}

export let todos: Todo[] = []; 

// 🔹 Uloží aktuálny zoznam do localStorage
export const saveTodos = (): void => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// 🔹 Načíta todos z localStorage pri štarte
export const loadTodos = (): void => {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
  }
};  