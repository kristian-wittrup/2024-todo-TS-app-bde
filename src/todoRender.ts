import { todos } from './todos';
import { removeTodo, editTodo, toggleCompleted, toggleFavorite, duplicateTodo, copyTodoText } from './todoActions';

const todoList = document.getElementById('todo-list') as HTMLUListElement;

export const renderTodos = (showOnlyFavorites: boolean = false): void => {
  todoList.innerHTML = '';


  const filteredTodos = showOnlyFavorites ? todos.filter(t => t.favorite) : todos;

  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button class="toggle-btn">Toggle</button>
        <button class="edit-btn">Edit</button>
        <button class="duplicate-btn">Duplicate</button>
        <button class="copy-btn">Copy</button>
        <button class="remove-btn">Remove</button>
        <button class="favorite-btn">${todo.favorite ? '★' : '☆'}</button>
      </div>
    `;

    const textSpan = li.querySelector('span') as HTMLSpanElement;
    if (todo.completed) {
      textSpan.classList.add('completed');
    } else {
      textSpan.classList.remove('completed');
    }

    const toggleBtn = li.querySelector('.toggle-btn') as HTMLButtonElement;
    toggleBtn.addEventListener('click', () => toggleCompleted(todo.id));

    const favoriteBtn = li.querySelector('.favorite-btn') as HTMLButtonElement;
    favoriteBtn.addEventListener('click', () => toggleFavorite(todo.id));

    const editBtn = li.querySelector('.edit-btn') as HTMLButtonElement;
    editBtn.addEventListener('click', () => {
      const newText = prompt('Edit todo', todo.text);
      if (newText) editTodo(todo.id, newText);
    });

    const removeBtn = li.querySelector('.remove-btn') as HTMLButtonElement;
    removeBtn.addEventListener('click', () => removeTodo(todo.id));

    const duplicateBtn = li.querySelector('.duplicate-btn') as HTMLButtonElement;
    duplicateBtn.addEventListener('click', () => duplicateTodo(todo.id));

    const copyBtn = li.querySelector('.copy-btn') as HTMLButtonElement;
    copyBtn.addEventListener('click', () => copyTodoText(todo.id));

    todoList.appendChild(li);
  });
};
