//canvas_checklist.js

/* --- SECTION 01 ---
 *================================== *
 * JavaScript Stack                  *
 *================================== */

class CanvasTodoManager {
    constructor(initialItems) {
        this.dataStack = initialItems; 
        this.listElement = document.getElementById('canvas-todo-list');
        // Target the number span specifically
        this.countElement = document.getElementById('todo-count-num');
        this.maxVisible = 3;
        
        this.renderInitial();
    }

    updateCount() {
        if (this.countElement) {
            this.countElement.textContent = this.dataStack.length - this.maxVisible;
            
            //Hide the link entirely if the stack is empty
            const parent = this.countElement.closest('.view-all');
            parent.style.display = this.dataStack.length - this.maxVisible <= 0 ? 'none' : 'block';
        }
    }

    renderInitial() {
        this.listElement.innerHTML = '';
        const toShow = this.dataStack.slice(-this.maxVisible).reverse();
        toShow.forEach(item => this.addVisibleItem(item, false));
        this.updateCount();
    }

    addVisibleItem(item, animate = true) {
        if (document.getElementById(`todo-${item.id}`)) return;

        const itemHtml = `
            <div class="todo-item ${animate ? 'hidden-state' : ''}" id="todo-${item.id}">
                <div class="todo-header">
                    <input type="checkbox" class="todo-checkbox" onclick="completeTask(${item.id})">
                    <p class="todo-title">${item.text}</p>
                </div>
                <div class="todo-meta">
                    <span><i class="far fa-calendar"></i> ${item.meta}</span>
                    <span>${item.pts}</span>
                </div>
            </div>`;
        
        this.listElement.insertAdjacentHTML('beforeend', itemHtml);

        if (animate) {
            const newElem = this.listElement.lastElementChild;
            void newElem.offsetWidth; // Trigger reflow
            newElem.classList.remove('hidden-state');
        }
    }

    popAndReplenish(id) {
        const itemElem = document.getElementById(`todo-${id}`);
        if (!itemElem) return;

        itemElem.classList.add('leaving');

        setTimeout(() => {
            itemElem.remove();
            
            // Remove from data
            this.dataStack = this.dataStack.filter(item => item.id !== id);
            this.updateCount();

            // Replenish logic
            if (this.dataStack.length >= this.maxVisible) {
                const nextItemIndex = this.dataStack.length - this.maxVisible;
                const nextItem = this.dataStack[nextItemIndex];
                this.addVisibleItem(nextItem, true);
            }
        }, 400);
    }
}

// Your assignments (Stack: Last item is "top")
const myTasks = [
    { id: 6, text: "BIO 112 – Lab Report", meta: "Oct 18", pts: "50 pts" },
    { id: 5, text: "MATH 290 – Problem Set", meta: "Oct 16", pts: "20 pts" },
    { id: 4, text: "EECS 268 – Lab 9", meta: "Oct 14", pts: "20 pts" },
    { id: 3, text: "PSYCH 101 – Discussion", meta: "Oct 12", pts: "10 pts" },
    { id: 2, text: "EECS 330 – Assignment 4", meta: "Tomorrow", pts: "15 pts" },
    { id: 1, text: "EECS 330 – Reading", meta: "Tonight", pts: "5 pts" }
];

const todoManager = new CanvasTodoManager(myTasks);

function completeTask(id) {
    todoManager.popAndReplenish(id);
}


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
