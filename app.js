// console.log('Page is ready!')

/* setup and initialization */
const todos = [
  { text: 'Sleep like no tomorrow', done: true },
  { text: 'Cook all the food in the store', done: false },
  { text: 'Eat everything', done: false },
  { text: 'Get high on rice', done: false },
  { text: 'Purge like no man business', done: false },
  { text: 'Use some drug', done: false },
  { text: 'Star getting normal gradually', done: false },
  { text: 'Rush to toilet for last warning', done: false },
  { text: 'Feel relived', done: false },
  { text: 'Promise yourself never to try that again', done: false },
  { text: 'Start coding', done: false },
  { text: 'Repeat', done: false }
]

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

function renderTodos () {
  todosElement.innerHTML = ''

  todos.forEach(todo => {
    todosElement.innerHTML += `<div class="todo-item">
      <input type="checkbox" class="todo-status" ${todo.done ? 'checked' : ''}>
      <span class="todo-text">${todo.text}</span>
    </div>`
  })
}

function setupTodos () {
  renderTodos()
}

// event listeners and triggers
todoFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const todoText = todoInputElement.value;
  addTodo(todoText);
});

setupTodos()
console.log(todoItemElements)

