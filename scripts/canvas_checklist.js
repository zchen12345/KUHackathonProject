//canvas_checklist.js

//To-do List Toggle Function
function toggleTodo(checkbox) {
    // Find the parent .todo-item 
    const todoItem = checkbox.closest('.todo-item');

    //Toggle the completed class
    if (checkbox.checked) {
      todoItem.classList.add('completed');
    } else {
      todoItem.classList.remove('completed');
    }
  }