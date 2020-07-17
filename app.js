// console.log('Page is ready!')

/* selectors */
const todosElement = document.getElementById('todos');
const todoFormElement = document.getElementById('todo-form');
const todoInputElement =  document.getElementById('todo-input');
const todoItemElements = document.getElementsByClassName('todo-item')

/* utility functions */
function addTodo (text) {
  const markup = `<div class="todo-item">
    <input type="checkbox" class="todo-status">
    <span class="todo-text">${text}</span>
  </div>`;

  todosElement.innerHTML += markup;
}

// event listeners and triggers
todoFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const todoText = todoInputElement.value;
  addTodo(todoText);
});

console.log(todoItemElements)