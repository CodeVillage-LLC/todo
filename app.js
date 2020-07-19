// console.log('Page is ready!')

/* setup and initialization */
let todos;
const defaultTodos = [
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
];
let todoItemIndexInEdit = null;
const currentEdit = {};

/* selectors */
const todosElement = document.getElementById('todos');
const todoFormElement = document.getElementById('todo-form');
const todoInputElement =  document.getElementById('todo-input');
const todoItemElements = document.getElementsByClassName('todo-item')
const todoStatElement = document.getElementById('todos-stat')
const editModalElement = document.getElementById('edit-modal')
const editFormElement = document.getElementById('edit-form')
const editStatusElement = document.getElementById('edit-status')
const editTextElement = document.getElementById('edit-text')
const cancelEditElement = document.getElementById('cancel-edit')

/* utility functions */
function renderTodoItems () {
  todosElement.innerHTML = ''

  todos.forEach((todo, todoIndex) => {
    todosElement.innerHTML += `<div class="todo-item" data-todo_index="${todoIndex}">
      <input type="checkbox" class="todo-status" ${todo.done ? 'checked' : ''} data-todo_index="${todoIndex}">
      <span class="todo-text" data-todo_index="${todoIndex}">${todo.text}</span>
      <img class="edit-todo" src="media/edit.svg" data-purpose="edit" data-todo_index="${todoIndex}">
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
  persistTodos()
  renderTodoItems()
  renderStats()
}

function addTodo (text) {
  todos.push({ text, done: false })
  todoInputElement.value = ''
  updateView()
}

function setupTodos () {
  let storedTodos = window.localStorage.getItem('my_todo-items')

  if (storedTodos) {
    todos = JSON.parse(storedTodos)
  } else {
    todos = defaultTodos
  }
  updateView()
}

function toggleTodoStatus (index) {
  todos[index].done = !todos[index].done
  updateView()
}

function removeTodo(index) {
  todos.splice(index, 1);
  updateView()
}

function initEdit(todoIndex) {
  todoItemIndexInEdit = todoIndex

  editModalElement.classList.add('active');
  // editStatusElement.checked = todos[todoIndex].done
  editTextElement.value = todos[todoItemIndexInEdit].text
}

function editTodoItem(newText) {
  todos[todoItemIndexInEdit].text = newText
  updateView();
}

function persistTodos () {
  window.localStorage.setItem('my_todo-items', JSON.stringify(todos))
}

// event listeners and triggers
todoFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const todoText = todoInputElement.value;
  addTodo(todoText);
});

todosElement.addEventListener('click', (e) => {
  const { todo_index, purpose } = e.target.dataset

  // ignore click event if no todo item was actually clicked
  if (!todo_index) return

  // toggle todo item status if there's no purpose (edit/delete) detected
  if (!purpose) {
    toggleTodoStatus(todo_index)
  } else {
    // delete todo item if purpose was to delete or initiate edit todo item if purpose was to edit
    if (purpose === 'delete') {
      removeTodo(todo_index)
    } else if (purpose === 'edit') {
      initEdit(todo_index);
    }
  }
})

// editStatusElement.addEventListener('input', (e) => {
//   console.log(e)
// })

cancelEditElement.addEventListener('click', e => {
  editModalElement.classList.remove('active')
})

editFormElement.addEventListener('submit', e => {
  e.preventDefault()

  const newTodoText = editTextElement.value
  if (!newTodoText) return

  if (newTodoText !== todos[todoItemIndexInEdit].text) {
    editTodoItem(newTodoText);
  }

  editModalElement.classList.remove('active')
})

setupTodos();
