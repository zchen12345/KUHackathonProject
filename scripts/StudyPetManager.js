//StudyPetManager.js

/* --- SECTION 01 ---
 *================================== *
 * JavaScript Variables              *
 *================================== */

// Load existing data or use default values
const savedInventory = localStorage.getItem('petInventory');

//Inventory Variable
export const inventory = savedInventory 
    ? JSON.parse(savedInventory) 
    : { Apple : 0, Ball : 0 };


/* --- SECTION 02 ---
 *================================== *
 * JavaScript Functions              *
 *================================== */

// Helper function to save current state
function saveToDisk() {
    localStorage.setItem('petInventory', JSON.stringify(inventory));
    return;
}


//Add Item to Inventory Function
export function addItem(type, count=1) {
  if (inventory.hasOwnProperty(type)) {
    inventory[type] += count;
    saveToDisk();
    console.log(`${type} added. Current stock:`, inventory);
  }

  return;
}


//Use Item From Inventory Function
export function useItem(type) {
  if (inventory[type] > 0) {
    inventory[type]--;
    saveToDisk();
    return true; // Success
  }
  return false; // None left
}