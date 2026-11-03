/**
 * NOTE to self
 * Make a module and import the functions from the module
 * Seperate the functions into different files
 * Logical grouping of functions - for example, all functions related to adding a todo item can be in one file
 * 
 */


/**
 * REDO it. More streqamlined and better structure - 
 */


// 1 Import the CSS file: This ensures that the styles are applied to the HTML elements.
import './style.css';

// Step 2: Define the Todo interface
// Define the Todo interface: This interface defines the structure of a todo item.
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Step 3: Initialize an empty array to store todos
// Initialize an empty array: This array will store the list of todos.
export let todos: Todo[] = [];
// Only these three filter values are allowed.
type Filter = 'all' | 'active' | 'completed';

// Show all tasks when the app opens.
let currentFilter: Filter = 'all';

// Step 4: Get references to the HTML elements
// Get references to the HTML elements: These references will be used to interact with the DOM
const todoInput = document.getElementById('todo-input') as HTMLInputElement; // exist in HTML file
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;    // exist in HTML file
const todoList = document.getElementById('todo-list') as HTMLUListElement;   // exist in HTML file






// Step 5: Function to add a new todo
// Function to add a new todo: This function creates a new todo object and adds it to the array.
export const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(), // Generate a unique ID based on the current timestamp
    text: text,
    completed: false,
  };
  todos.push(newTodo);
  console.log("Todo added: ", todos); // Log the updated list of todos to the console
  renderTodos(); // Render the updated list of todos => create the function next
};

// Switch the task between active and completed.
export const toggleTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
};

// Step 6: Function to render the list of todos
// Function to render the list of todos: This function updates the DOM to display the current list of todos.
const renderTodos = (): void => { // void because no return - what we are doing is updating the DOM
  // Clear the current list
  todoList.innerHTML = '';
  // Choose which tasks to show without changing the full list.
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'active') {
      return !todo.completed;
    }

    if (currentFilter === 'completed') {
      return todo.completed;
    }

    return true;
  });
  
  // Iterate over the todos array and create list items for each todo
  filteredTodos.forEach(todo => { // In this specific case, .forEach is more suitable because we are directly modifying the DOM for each todo item.
    const li = document.createElement('li');
    li.className = 'todo-item'; // Add a class to the list item
    // Use template literals to create the HTML content for each list item
    li.innerHTML = `
      <label>
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <span>${todo.text}</span>
      </label>
      <button>Remove</button>
      <button id="editBtn">Edit</button>
    `;

    // Update the task status when the checkbox changes.
    const checkbox = li.querySelector('input');
    checkbox?.addEventListener('change', () => toggleTodo(todo.id));

    // addRemoveButtonListener is further down in the code. We have onclick in the function instead of template literals. More safe to use addEventListener.
    addRemoveButtonListener(li, todo.id); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo. 
    addEditButtonListener(li, todo.id); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo. 
    todoList.appendChild(li); // Append the list item to the ul element
  });
};

const allButton = document.getElementById('filter-all') as HTMLButtonElement;
const activeButton = document.getElementById('filter-active') as HTMLButtonElement;
const completedButton = document.getElementById('filter-completed') as HTMLButtonElement;

// Change the filter and highlight its button.
const setFilter = (filter: Filter): void => {
  currentFilter = filter;

  allButton.classList.toggle('selected', filter === 'all');
  activeButton.classList.toggle('selected', filter === 'active');
  completedButton.classList.toggle('selected', filter === 'completed');

  renderTodos();
};

// Show the tasks for the clicked filter.
allButton.addEventListener('click', () => setFilter('all'));
activeButton.addEventListener('click', () => setFilter('active'));
completedButton.addEventListener('click', () => setFilter('completed'));

// Step 6.1: Function to render the list of todos
// Initial render
renderTodos(); // Call the renderTodos function to display the initial list of todos : Should be at the end of the code to ensure that the function is defined before it is called.
// The initial render is important to display the list of todos when the page is first loaded. Without it, the list would be empty until a new todo is added.
// Move it when code is complete ( refactoring ) 



//Improved code for step 7 - user input validation - move the error message to the top of the Typescript file
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement; // Should be moved to the top + added to the HTML file

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const text = todoInput.value.trim(); // Get the value of the input field and remove any leading or trailing whitespace

  if (text !== '') { // Check if the input field is empty
    todoInput.classList.remove('input-error'); // Remove the error highlight if present
    errorMessage.style.display = 'none'; // Hide the error message
    addTodo(text); // Add the todo item
    todoInput.value = ''; // Clear the input field
  } else {
    console.log("Please enter a todo item"); // Provide feedback to the user
    todoInput.classList.add('input-error'); // Add a class to highlight the error
    errorMessage.style.display = 'block'; // Show the error message
  }
});



// Step 8: Function to removes all a todo by ID
// Function to add event listener to the remove button - this function has an callback function that removes the todo item from the array.
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id)); // We have an optional chaining operator here to avoid errors if the button is not found - for example, if the button is removed from the DOM.
};
/*
example of explicit null checking - without optional chaining operator, but basically the same as above
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  if (removeButton) {
    removeButton.addEventListener('click', () => removeTodoById(id));
  } else {
    console.error(`Remove button not found for todo item with ID: ${id}`);
  }
};
*/


// Step 8: Function to remove a todo by ID
// Function to remove a todo by ID: This function removes a todo from the array based on its ID.
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(); // Re-render the updated list of todos
}; 


// Edit event listener - make button and add button to each todo
const addEditButtonListener = (li: HTMLLIElement, id:number) => {
  // make use of the editBtn id to edit the todo
  const editButton = li.querySelector('#editBtn')
  editButton?.addEventListener('click', () => editTodo(id)) 
}

// Edit function - prompt user to edit the todo : editTodo
const editTodo = (id:number) => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    const text = prompt('Edit todo', todo.text)
    if (text) {
      todo.text = text
      renderTodos()
    }
  }
}

/**
 * color picker
 */

// Function to change the background color of the page based on the color picker value
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

// Function to initialize the color picker event listener
const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement; // encapsulate the color picker element to this function
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};

// Call the initializeColorPicker function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
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

