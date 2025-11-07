// main.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { todos } from '../src/todos';
import { addTodo, removeTodo, editTodo } from '../src/todoActions';

describe('Todo App', () => {
  beforeEach(() => {
    todos.length = 0; // reset todos
  });

  it('should add a new todo', () => {
    const newTodo = addTodo('Test Todo');
    expect(todos.length).toBe(1);
    expect(todos[0]).toEqual(newTodo);
  });

  it('should mark a todo as completed', () => {
    const newTodo = addTodo('Test Todo');
    newTodo.completed = true;
    expect(todos[0].completed).toBe(true);
  });

  it('should delete a todo', () => {
    const newTodo = addTodo('Test Todo');
    removeTodo(newTodo.id);
    expect(todos.length).toBe(0);
  });

  it('should edit a todo', () => {
    const newTodo = addTodo('Test Todo');
    editTodo(newTodo.id, 'Updated Todo');
    expect(todos[0].text).toBe('Updated Todo');
  });
});
