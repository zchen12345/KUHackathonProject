//assignment_handler.js

/* --- SECTION 01 ---
 *================================== *
 * JavaScript Variables              *
 *================================== */

const CHECKLIST = document.getElementById("checklist_container");


/* --- SECTION 02 ---
 *================================== *
 * JavaScript Functions              *
 *================================== */

//Listen to Completed Task Function
CHECKLIST.addEventListener('change', (event) => {
    const cl_handler = event.target;

  //Check if the changed element is actually a checkbox
  if (cl_handler.type === 'checkbox') {
    if (cl_handler.checked) {
      read_completed_task(cl_handler);
    } 
  }
});


//Read Completed Task Function
function read_completed_task(completed_task) {
    console.log("I worked")
    //read completed task, see type, and return intensity
    return
}


//Reward Cookies Function
function reward(task_intensity) {
    //look at task and reward cookies
    return
}