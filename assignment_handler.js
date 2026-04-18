//assignment_handler.js

/* --- SECTION 01 ---
 *================================== *
 * JavaScript Variables              *
 *================================== */

//Rewards Data
const REWARDS = {
  Easy: {
    exp: 20,
    items: [
      { name: 'Apple', count: 1 },
      { name: 'Ball', count: 1 }
    ]
  },
  Medium: {
    exp: 40,
    items: [
      { name: 'Apple', count: 2 },
      { name: 'Ball', count: 2 }
    ]
  },
  Hard: {
    exp: 60,
    items: [
      { name: 'Apple', count: 4 },
      { name: 'Ball', count: 4 }
    ]
  }
};

const CHECKLIST = document.getElementById("checklist_container");


/* --- SECTION 02 ---
 *================================== *
 * JavaScript Functions              *
 *================================== */

//Random Number Generator Function
function random_num_generator() {
    let result = "";
    const gate_one = Math.round(Math.random());
    const gate_two = Math.round(Math.random());

    //AND Gate
    if (gate_one == 0 && gate_two == 0) {
        result = "Easy";
    } else if (gate_one == 1 && gate_two == 0) {
        result = "Easy";
    } else if (gate_one == 0 && gate_two == 1) {
        result = "Medium";
    } else if (gate_one == 1 && gate_two == 1) {
        result = "Hard";
    } else {
        console.log("Invalid Result")
    }

    return result;
}


//Listen to Completed Task Function
CHECKLIST.addEventListener('change', (event) => {
    const cl_handler = event.target;

  //Check if the changed element is actually a checkbox
  if (cl_handler.type === 'checkbox') {
    if (cl_handler.checked) {
      let TIER = read_completed_task(cl_handler.name);
      reward(TIER)
    } 
  }
});


//Read Completed Task Function
function read_completed_task(completed_task) {
    console.log(completed_task)
    let something = random_num_generator();

    //read completed task, see type, and return intensity
    return something;
}


//Reward Cookies Function
function reward(task_intensity) {
    //Local Variable
    const rewardData = REWARDS[task_intensity];
    console.log(rewardData);

    alert(`Task Complete! Gained ${rewardData.exp} EXP and items.`);

    return
}