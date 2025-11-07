// todos.ts
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  favorite?: boolean;
}

export let todos: Todo[] = []; 

  