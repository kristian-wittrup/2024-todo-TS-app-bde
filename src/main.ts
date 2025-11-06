// 1) Styles
import './style.css';

// 2) Types
type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority?: Priority;
}

// 3) State
export let todos: Todo[] = [];

// 4) Helpers
const isOverdue = (todo: Todo): boolean => {
  if (!todo.dueDate || todo.completed) return false;
  const due = new Date(`${todo.dueDate}T23:59:59`);
  return !Number.isNaN(due.getTime()) && due.getTime() < Date.now();
};

const getSelectedPriority = (): Priority => {
  const el = document.getElementById('priority-select') as HTMLSelectElement | null;
  return (el?.value as Priority) ?? 'medium';
};

// 5) DOM refs
const todoInput   = document.getElementById('todo-input') as HTMLInputElement;
const todoForm    = document.querySelector('.todo-form') as HTMLFormElement;
const todoList    = document.getElementById('todo-list') as HTMLUListElement;
const sortBtn     = document.getElementById('sortByPriority') as HTMLButtonElement;
const clearBtn    = document.getElementById('clearCompleted') as HTMLButtonElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

// 6) Add todo
export const addTodo = (text: string, dueDate?: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
    dueDate,
    priority: getSelectedPriority(),
  };
  todos.push(newTodo);
  renderTodos();
};

// 7) Render
const renderTodos = (): void => {
  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Main content (text + buttons)
    li.innerHTML = `
      <span>${todo.text}</span>
      <button>Remove</button>
      <button id="editBtn">Edit</button>
    `;

    // NEW: completion checkbox (insert as first child)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      renderTodos();
    });
    li.insertBefore(checkbox, li.firstChild);

    // Priority badge
    const priorityBadge = document.createElement('span');
    priorityBadge.className = `priority-badge ${todo.priority ?? 'medium'}`;
    priorityBadge.textContent = `${todo.priority ?? 'medium'}`;
    li.appendChild(priorityBadge);

    // Due date badge
    if (todo.dueDate) {
      const due = document.createElement('span');
      due.className = 'due-badge';
      due.textContent = `due: ${todo.dueDate}`;
      li.appendChild(due);
    }

    // Overdue highlight
    if (isOverdue(todo)) {
      li.style.color = 'red';
      li.style.fontWeight = '600';
      li.title = 'Overdue';
    } else {
      li.style.removeProperty('color');
      li.style.removeProperty('font-weight');
      li.removeAttribute('title');
    }

    // Completed styling (light + line-through)
    if (todo.completed) {
      li.style.opacity = '0.6';
      const txt = li.querySelector('span') as HTMLSpanElement | null;
      if (txt) txt.style.textDecoration = 'line-through';
    }

    // Wire buttons
    const removeButton = li.querySelector('button') as HTMLButtonElement | null; // first button
    removeButton?.addEventListener('click', () => removeTodo(todo.id));

    const editButton = li.querySelector('#editBtn') as HTMLButtonElement | null;
    editButton?.addEventListener('click', () => editTodo(todo.id));

    // Append to list
    todoList.appendChild(li);
  });
};

// 8) Initial render
renderTodos();

// 9) Submit handler
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  const dueDate = (document.getElementById('due-date') as HTMLInputElement)?.value;

  if (text !== '') {
    todoInput.classList.remove('input-error');
    if (errorMessage) errorMessage.style.display = 'none';

    addTodo(text, dueDate);

    todoInput.value = '';
    const due = document.getElementById('due-date') as HTMLInputElement | null;
    if (due) due.value = '';
  } else {
    console.log('Please enter a todo item');
    todoInput.classList.add('input-error');
    if (errorMessage) errorMessage.style.display = 'block';
  }
});

// 10) Remove todo
export const removeTodo = (id: number): void => {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
};

// 11) Edit
const editTodo = (id: number) => {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    const text = prompt('Edit todo', todo.text);
    if (text) {
      todo.text = text;
      renderTodos();
    }
  }
};

// 12) Sort by priority (attach once)
sortBtn?.addEventListener('click', () => {
  const rank: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
  todos = [...todos].sort(
    (a, b) => rank[a.priority ?? 'medium'] - rank[b.priority ?? 'medium']
  );
  renderTodos();
});

// 13) Clear completed (attach once)
clearBtn?.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  renderTodos();
});

// 14) Color picker (unchanged)
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};
const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};
document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});
