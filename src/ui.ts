import { Todo } from "./interfaces";

import { FilterStatus } from "./state";

// Step 4: Get references to the HTML elements
// Get references to the HTML elements: These references will be used to interact with the DOM
export const todoInput = document.getElementById(
    "todo-input"
) as HTMLInputElement; // exist in HTML file
export const todoForm = document.querySelector(".todo-form") as HTMLFormElement; // exist in HTML file
export const todoList = document.getElementById(
    "todo-list"
) as HTMLUListElement; // exist in HTML file
//Improved code for step 7 - user input validation - move the error message to the top of the Typescript file
export const errorMessage = document.getElementById(
    "error-message"
) as HTMLParagraphElement; // Should be moved to the top + added to the HTML file

export const dateInput = document.getElementById(
    "date-input"
) as HTMLInputElement; // date input element

export const filterAll = document.getElementById(
    "filter-all"
) as HTMLButtonElement;
export const filterActive = document.getElementById(
    "filter-active"
) as HTMLButtonElement;
export const filterCompleted = document.getElementById(
    "filter-completed"
) as HTMLButtonElement;

const isOverdue = (todo: Todo): boolean => {
    if (!todo.dueDate || todo.completed) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day
    const dueDate = new Date(todo.dueDate);
    return dueDate < today;
};

// Step 6: Function to render the list of todos
// Function to render the list of todos: This function updates the DOM to display the current list of todos.
export const renderTodos = (
    todosToRender: Todo[],
    onRemove: (id: number) => void,
    onEdit: (id: number) => void
): void => {
    // void because no return - what we are doing is updating the DOM
    // Clear the current list
    todoList.innerHTML = "";

    // Iterate over the todos array and create list items for each todo
    todosToRender.forEach((todo) => {
        const isOverdueTodo = isOverdue(todo);
        // In this specific case, .forEach is more suitable because we are directly modifying the DOM for each todo item.
        const li = document.createElement("li");
        li.className = `todo-item ${isOverdueTodo ? "overdue" : ""}`; // Add a class to the list item
        // Use template literals to create the HTML content for each list item
        li.innerHTML = `
      <span>${todo.text}</span>
      ${
          todo.dueDate
              ? `<span class="todo-date">Due: ${todo.dueDate}</span>`
              : "-"
      }
      <button>Remove</button>
         <button id="editBtn">Edit</button>
    `;
        // addRemoveButtonListener is further down in the code. We have onclick in the function instead of template literals. More safe to use addEventListener.
        addRemoveButtonListener(li, todo.id, onRemove); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo.
        addEditButtonListener(li, todo.id, onEdit); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo.
        todoList.appendChild(li); // Append the list item to the ul element
    });
};

// Step 8: Function to removes all a todo by ID
// Function to add event listener to the remove button - this function has an callback function that removes the todo item from the array.
export const addRemoveButtonListener = (
    li: HTMLLIElement,
    id: number,
    callback: (id: number) => void
): void => {
    const removeButton = li.querySelector("button");
    removeButton?.addEventListener("click", () => callback(id)); // We have an optional chaining operator here to avoid errors if the button is not found - for example, if the button is removed from the DOM.
};

// Edit event listener - make button and add button to each todo
const addEditButtonListener = (
    li: HTMLLIElement,
    id: number,
    callback: (id: number) => void
) => {
    // make use of the editBtn id to edit the todo
    const editButton = li.querySelector("#editBtn");
    editButton?.addEventListener("click", () => callback(id));
};

export const updateFilterButtons = (currentFilter: FilterStatus): void => {
    filterAll.classList.toggle("active", currentFilter === "all");
    filterActive.classList.toggle("active", currentFilter === "active");
    filterCompleted.classList.toggle("active", currentFilter === "completed");
};

export const showInputError = (): void => {
    todoInput.classList.add("input-error"); // Add a class to highlight the error
    errorMessage.style.display = "block";
};
export const clearInputError = (): void => {
    todoInput.classList.remove("input-error");
    errorMessage.style.display = "none";
};

export const clearInputs = (): void => {
    todoInput.value = ""; // Clear the input field
    dateInput.value = "";
};

export const promptForEditText = (currentText: string): string | null => {
    return prompt("Edit todo", currentText);
};

/**
 * color picker
 */

// Function to change the background color of the page based on the color picker value
const changeBackgroundColor = (color: string): void => {
    document.body.style.backgroundColor = color;
};

// Function to initialize the color picker event listener
export const initializeColorPicker = (): void => {
    const colorPicker = document.getElementById(
        "colorPicker"
    ) as HTMLInputElement; // encapsulate the color picker element to this function
    if (colorPicker) {
        colorPicker.addEventListener("input", (event: Event) => {
            const target = event.target as HTMLInputElement;
            changeBackgroundColor(target.value);
        });
    } else {
        console.error("Color picker element not found");
    }
};
