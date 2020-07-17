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
const todoStatElement = document.getElementById('todos-stat')

/* utility functions */
function renderTodoItems () {
  todosElement.innerHTML = ''

  todos.forEach((todo, todoIndex) => {
    todosElement.innerHTML += `<div class="todo-item" data-todo_index="${todoIndex}">
      <input type="checkbox" class="todo-status" ${todo.done ? 'checked' : ''} data-todo_index="${todoIndex}">
      <span class="todo-text" data-todo_index="${todoIndex}">${todo.text}</span>
      <img class="remove-todo" src="media/delete.svg" data-purpose="delete" data-todo_index="${todoIndex}">
    </div>`
  })
}
function renderStats () {
  const todosCount = todos.length
  const pendingCount = todos.filter(todo => !todo.done).length
  const doneCount = todos.filter(todo => todo.done).length

  todoStatElement.innerHTML = `<span>Total: ${todosCount}</span>
  <span>Todo: ${pendingCount}</span>
  <span>Done: ${doneCount}</span>`
}
function updateView () {
  renderTodoItems()
  renderStats()
}

function addTodo (text) {
  todos.push({ text, done: false })
  todoInputElement.value = ''
  updateView()
}

function setupTodos () {
  updateView()
}

function toggleTodoStatus (index) {
  todos[index].done = !todos[index].done
  updateView()
}

function removeTodo(index) {
  todos.splice(index, 1)
  updateView()
}

// event listeners and triggers
todoFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const todoText = todoInputElement.value;
  addTodo(todoText);
});

todosElement.addEventListener('click', (e) => {
  // console.log('todos clicked!', e)
  // console.log(e.target.dataset['todo_index'])
  const clickedTodoIndex = e.target.dataset.todo_index

  if (!clickedTodoIndex) return

  toggleTodoStatus(clickedTodoIndex)
})

todosElement.addEventListener('click', (e) => {
  const { todo_index, purpose } = e.target.dataset

  if (!todo_index || (!purpose || purpose !== 'delete')) return

  removeTodo(todo_index)
})


setupTodos()
