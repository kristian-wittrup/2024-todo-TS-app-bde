import { describe, expect, test } from 'vitest';
import { calculateProgress } from './progress';

describe('Task progress', () => {
  test('Return 0 for an empty list', () => {
    expect(calculateProgress([])).toBe(0);
  });

  test('Return 0 when no tasks are completed', () => {
    const todos = [
      { id: 1, text: 'Buy milk', completed: false },
      { id: 2, text: 'Buy bread', completed: false },
    ];

    expect(calculateProgress(todos)).toBe(0);
  });

  test('Return 50 when half the tasks are completed', () => {
    const todos = [
      { id: 1, text: 'Buy milk', completed: true },
      { id: 2, text: 'Buy bread', completed: false },
    ];

    expect(calculateProgress(todos)).toBe(50);
  });

  test('Return 100 when all tasks are completed', () => {
    const todos = [
      { id: 1, text: 'Buy milk', completed: true },
      { id: 2, text: 'Buy bread', completed: true },
    ];

    expect(calculateProgress(todos)).toBe(100);
  });

  test('Round the percentage to a whole number', () => {
    const todos = [
      { id: 1, text: 'Buy milk', completed: true },
      { id: 2, text: 'Buy bread', completed: false },
      { id: 3, text: 'Buy apples', completed: false },
    ];

    expect(calculateProgress(todos)).toBe(33);

    // Completing another task should round 66.67 up to 67.
    todos[1].completed = true;

    expect(calculateProgress(todos)).toBe(67);
  });
});