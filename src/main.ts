// main.ts
import '../style.css';
import { addTodo, clearCompletedTodos } from './todoActions';
import { renderTodos } from './todoRender';
import { initializeColorPicker } from './colorPicker';

// DOM references
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
const clearCompletedBtn = document.getElementById('clear-completed') as HTMLButtonElement;

// Form submission
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

// Clear completed todos
clearCompletedBtn.addEventListener('click', () => {
  clearCompletedTodos();
});

// Initial render + color picker
document.addEventListener('DOMContentLoaded', () => {
  renderTodos();
  initializeColorPicker();
});


/** 
 * Kristian: 6th of September 2024, BDE
 * 
 * This is the list of optional features that can be added to the todo list application:
 * You must make at least one of these features to complete the project. The more the merrier.
 * In your submission video, please mention which feature you have implemented and demonstrate how it works. Go through the code and explain how you implemented the feature and how it works.
 * IF, you want to implement something not on list, you can do that as well.
*/


//Optional features list: 

// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item

// Option 2: Add a button to clear all completed todos
// Add a button to clear all completed todos
// Function to clear all completed todos
// Add a button to toggle all todos

// Option 3: Add a button to toggle all todos
// Edit a todo item and update it
// Add an input field to edit a todo item
// Save the updated todo item
// Cancel the editing of a todo item
// Add a button to cancel the editing of a todo item

// Option 4: Add a button to filter todos by status
// Add a button to filter todos by status
// Function to filter todos by status

// Option 5: Add a button to sort todos by status
// Add a button to sort todos by status
// Function to sort todos by status

// Option 6: Due Date for Todos:
// Add a date input field to set a due date for each todo item.
// Display the due date next to each todo item.
// Highlight overdue todos.
// Priority Levels:

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.
// Search Functionality:

// Option 8: Add a search input field to filter todos based on the search query.
// Display only the todos that match the search query.
// Category Tags:

// Option 9: Add a text input field to assign category tags to each todo item.
// Display the tags next to each todo item.
// Filter todos by category tags.
// Progress Indicator:

// Option 10: Add a progress bar to show the percentage of completed todos.
// Update the progress bar as todos are marked as completed or incomplete.
// Dark Mode Toggle:

// Option 11: Add a button to toggle between light and dark modes.
// Change the app's theme based on the selected mode.
// Export/Import Todos:

// Option 12: Add buttons to export the list of todos to a JSON file.
// Add functionality to import todos from a JSON file.
// Notifications:

// Option 13: Add notifications to remind users of due todos.
// Use the Notification API to show browser notifications.

// Option 14: Local Storage:
// Save the list of todos to local storage.
// Retrieve the todos from local storage on page load.
// Add a button to clear all todos from local storage.

// Option 15: JSDOC Comments:
// Add JSDoc comments to document the functions and interfaces in the code.
// Link : https://jsdoc.app/

// Optional 16: Handle Errors:
// Add error handling for user input validation. Show red text or border for invalid input.
// Display error messages for invalid input.

