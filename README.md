**KU Hackathon 2026 Project** <br>

Project Name: StudyPet <br>
Theme Track : Make Something Boring, Fun!

*Abstract:* <br>
StudyPet is a HTML/CSS/JavaScript Project that creates a virtual pet for the user. 
Every completed task from the user's Canvas to-do list will provide the user with items that will grow the user's StudyPet.
The pet can perish if an assignment lingers for too long, so be sure to complete your assignments!

*How to Use Our Project* <br>
Unfortunately we were unable to connect our project to Infrastructure Canvas API, so we created a mock Canvas dashboard HTML file.<br>
Step 1. Launch CanvasTestPage.html<br>
Step 2. Click the Paw Icon towards the top portion of the HTML page<br>
Step 3. Name your StudyPet and start completing assignments!

*Inspiration:* <br>
Our group wanted to make studying/completing assignments from the Canvas to-do list more fun, so we created an interactive virtual pet that a Canvas user can raise by doing their Canvas assignments.

*Project Explanation:* <br>
The Infrastructure Canvas page will have a new button that will launch the StudyPet application.
The user is greeted with a pet naming initialization screen if this is the first time the user launches StudyPet.
If the user already has StudyPet data, then the user will be directed to their pet data without seeing the initialization screen.
The pet screen will show the pet in the middle with an inventory at the bottom. The inventory will hold "Apples", which are used to fill the hunger meter, and "Balls", which are used to raise the mood of StudyPet.
Below the inventory is an assignment checklist. Currently, this is where the user can create tasks to complete. Completing a task will reward the user with "Apples" and "Balls", as well as gain experience for their StudyPet.
Every 100 Experience Point will level up StudyPet.
If an assignment is present in the assignment checklist, then the StudyPet's hunger and mood will decline. If the hunger is low, then the health of StudyPet will decline.
If the health of StudyPet reaches 0, then the StudyPet is considered deceased and the user must create a new StudyPet.
