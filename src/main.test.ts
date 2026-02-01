import { describe, it, expect, beforeEach } from 'vitest';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];

describe('Todo App', () => {
  beforeEach(() => {
    todos = [];
  });

  it('should add a new todo', () => {
    const newTodo: Todo = { id: 1, title: 'Test Todo', completed: false };
    todos.push(newTodo);
    expect(todos.length).toBe(1);
    expect(todos[0]).toEqual(newTodo);
  });

  it('should mark a todo as completed', () => {
    const newTodo: Todo = { id: 1, title: 'Test Todo', completed: false };
    todos.push(newTodo);
    todos[0].completed = true;
    expect(todos[0].completed).toBe(true);
  });

  it('should delete a todo', () => {
    const newTodo: Todo = { id: 1, title: 'Test Todo', completed: false };
    todos.push(newTodo);
    todos = todos.filter(todo => todo.id !== newTodo.id);
    expect(todos.length).toBe(0);
  });
});