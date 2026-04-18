//canvas_checklist.js

function toggleTodo(checkbox) {
    // Find the parent .todo-item and toggle the completed class
    const todoItem = checkbox.closest('.todo-item');
    if (checkbox.checked) {
      todoItem.classList.add('completed');
    } else {
      todoItem.classList.remove('completed');
    }
  }