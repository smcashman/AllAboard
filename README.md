# AllAboard

A modern one-page app to keep track of new employees through the on-boarding process. 

## Use Case	
While there are many options for tracking candidates for an open position and for managing your employees, this app is built to manage the gray area inbetween: the onboarding process. Add an employee once an offer has been made, and track their progress through the paperwork and initial training steps. Email new employees directly through the app to tie up any loose ends as efficiently as possible.

## Using the application
See employee information on main page. Click on the pencil on the top left of any employee's card to edit their information. Click on the trash can on the top right to delete that employee. Click on the envelope next to any employee's email address to quickly send them an email. Click on "Resources" in the top right to find links to the employee scheduler and the essential federal W-4 and I-9 forms.
![Mainpage](public/homepage.jpg?raw=true "Main page")
Click on Training Checklist to see employee's progress through onboarding process. Click on update to change their information.
![Training Checklist](public/checklist.jpg?raw=true "Training Page")
Click on "Add New Employee" on the top right to add a new employee to the roster. Any field in the checklist can be updated later as the onboarding process progresses. 
![Addemployee](public/addnew.jpg?raw=true "Add page")

## Working Prototype
You can access a working prototype here: (http://frozen-cliffs-63668.herokuapp.com/)

## Technical

The backend of this app uses NodeJS with ExpressJS for the server and MongoDB (with Mongoose) as the database. 
The email function is powered by NodeMailer. 
The API has an endpoint to return all employees currently listed and an endpoint to return a specific employee.

## Authors

* **Sara Cashman** - [Sara Cashman](https://smcashman.github.io)
