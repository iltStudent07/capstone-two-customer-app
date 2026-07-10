# Capstone-Two-Customer-App
The purpose of this project/repo is to showcase my skills with JavaScript fundamentals, TypeScript type safety, React component architecture, hooks (useState, useEffect, useContext, useReducer, customHooks), React Router, data fetching, forms with validation and component testing by creating a Customer Info Management App.

## Live Demo Link:
Here is a link to a live demo of the app hosted on GitHub pages:

https://iltstudent07.github.io/capstone-two-customer-app/

*Please note that this app uses an internal json file and the JSON Server API from Node Package Manager(npm) to similate server requests and responses. This deployed version of the app does not have access to that similated "backend" and as such will not have access to all its features and possibly might output errors. If you want to experience the full app you will need to follow the directions bellow to run the app for yourself on your local machine.

## Installation and Setup:
1. Clone or Fork this repo into a code editor of your choice (I personally use and recommend Microsoft VS Code).
  
2. Make sure Node.js is on your machine by typing ```npm -v``` into a terminal. If you do not see a response that gives a version number, you can go to https://nodejs.org/ to download it and recieve setup instructions.
  
3. Once Node.js on your machine, open the app folder if you have not already done so.
   
4. Open a terminal and type ```npm install``` this will install all the dependencies from the npm library that you will need to run the app.
   
5. For this next step I recommend that you have at least two terminals open: In one terminal you can type ```npm run api``` to start the JSON server that simulates the backend for the app and in the other terminal you can either type ```npm run dev``` to run the app on a Vite Dev server or ```npm run build``` and then ``npm run preview``` to see a preview of a production build of the app.

**Testing:**
There are two test files in this app that allow for automated testing of certain functions of the CustomerList and CustomerForm components. If you would like to run these tests for yourself follow ssetup steps 1-4 and then in a terminal type ```npm run test:run```

## App Features:

**Customer List Component** - The app displays a list of customers that it retrieves from the "server".

**Customer Form Component** - This component allows a user to add or edit a customer's info.

**React Router** - The app uses React Router to navigate to the different parts of the app. This also allows the app to dynamically show different customer info in the Edit page based off of the id number of a customer in the "server".

**NavBar** - The app contains a Navbar component with links that utalize React Router to navigate the user to different parts of the app.


## Architecture:
You can read a summary of App Component Heirarchy, App Design Choices and Architectural Decisions in [ARCHITECTURE.md](ARCHITECTURE.md)

## Repo Author:
Josh G/iltStudent07
