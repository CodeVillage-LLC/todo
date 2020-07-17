## Tips

> An alternative implementation of the renderTodoItems function using Array.prototype.map and String.prototype.join() will be;
```js
document.getElementById('todos').innerHTML = todos.map((todo, todoIndex) => {
  return `<div class="todo-item" data-todo_index="${todoIndex}">
      <input type="checkbox" class="todo-status" ${todo.done ? 'checked' : ''} data-todo_index="${todoIndex}">
      <span class="todo-text" data-todo_index="${todoIndex}">${todo.text}</span>
      <img class="remove-todo" src="media/delete.svg" data-todo_index="${todoIndex}">
</div>`
}).join('\n')
```

> to be implemented in the code as 
```js
function renderTodoItems () {
  todosElement.innerHTML = todos.map((todo, todoIndex) => {
  return `<div class="todo-item" data-todo_index="${todoIndex}">
      <input type="checkbox" class="todo-status" ${todo.done ? 'checked' : ''} data-todo_index="${todoIndex}">
      <span class="todo-text" data-todo_index="${todoIndex}">${todo.text}</span>
      <img class="remove-todo" src="media/delete.svg" data-todo_index="${todoIndex}">
</div>`
}).join('\n')
}
```