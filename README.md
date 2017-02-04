# AllAboard

A modern one-page app to keep track of new employees through the on-boarding process. 

## Use Case	
While there are many options for tracking candidates for an open position and for managing your employees, this app is built to manage the gray area inbetween: the onboarding process. Add an employee once an offer has been made, and track their progress through the paperwork and initial training steps. Email new employees directly through the app to tie up any loose ends as efficiently as possible.

## Using the application
See employee information on main page.
![Mainpage](public/homepage.jpg?raw=true "Main page")
Click on Training Checklist to see employee's progress through onboarding process.
![Training Checklist](public/checklist.jpg?raw=true "Training Page")
Add a new employee to the roster.
![Addemployee](public/addnew.jpg?raw=true "Add page")

## Working Prototype
You can access a working prototype here: (http://frozen-cliffs-63668.herokuapp.com/)


## API Documentation
AllAboard is a RESTful app that will return results in JSON.
Ajax GET calls to /employees will return a JSON object listing all books currently in the database. 
Send an Ajax GET call to /employees/:_ID to return a listing for a specific employee. 


## Technical

The backend of this app uses NodeJS with ExpressJS for the server and MongoDB (with Mongoose) as the database. 
The email function is powered by NodeMailer
The API has an endpoint to return all employees currently listed and an endpoint to return a specific employee.

## Authors

* **Sara Cashman** - [Sara Cashman](https://smcashman.github.io)
