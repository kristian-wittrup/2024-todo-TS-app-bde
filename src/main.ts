// main.ts
import '../style.css';
import { addTodo, clearCompletedTodos } from './todoActions';
import { renderTodos } from './todoRender';
import { initializeColorPicker } from './colorPicker';
import { loadTodos } from './todos';

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
const clearCompletedBtn = document.getElementById('clear-completed') as HTMLButtonElement;
const favoriteFilter = document.getElementById('show-favorites') as HTMLInputElement;


todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text);
    todoInput.value = '';
  } else {
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  }
});

clearCompletedBtn.addEventListener('click', () => {
  clearCompletedTodos();
});

if (favoriteFilter) {
  favoriteFilter.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    renderTodos(target.checked);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
  renderTodos();
  initializeColorPicker();
});