//canvas_checklist.js

/* --- SECTION 02 ---
 *================================== *
 * JavaScript Functions              *
 *================================== */

//To-do List Toggle Function
function toggleTodo(checkbox) {
  //Find the closest parent with the class 'todo-item'
  const todoItem = checkbox.closest('.todo-item');
  
  if (checkbox.checked) {
    //Add the completed class to trigger the CSS fade
    todoItem.classList.add('completed');

    //Remove Element After Timeout
    setTimeout(() => {
      todoItem.style.display = 'none';
    }, 500);

  } else {
    todoItem.classList.remove('completed');
  }
}

function openStudyPet() {
  document.getElementById('studyPetModal').style.display = 'flex';
}

function closeStudyPet() {
  document.getElementById('studyPetModal').style.display = 'none';
}

// Optional: Close the pop-up if the user clicks outside the window
window.addEventListener('click', function(event) {
  const modal = document.getElementById('studyPetModal');
  if (event.target == modal) {
    closeStudyPet();
  }
});