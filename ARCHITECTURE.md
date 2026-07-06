# App Architecture Overview

## Overview:
This document goes over the architecture of this customer info manager app. It covers app tree layout, components, data flow and architecture plan.


## App Component Tree:
App
    BrowserRouter
        Layout
            Header (nav links)
            Routes
                ListPage
                    CustomerList
                        CustomerRow (one per customer)
                Add Page
                    CustomerForm (mode: "add")
                EditPage
                    CustomerForm (mode: "edit")


## Architecture Plan:
**Where will customer state live?:**

A Context provider wrapping the app, this will make it easy to track state across the different parts of the app. This will make it easier to add extra features to the app down the road and track their state, such as an appTheme component.

**How will CRUD operations be managed?:**

CRUD operations will be managed with useReducer for scalability. This will allow for easy scalability of app logic if more components are added or more ways of manipulating customer data is needed.

**What Custom Hooks will be needed?:**
A hook for fetching data from the customer database. If there is time to add some of the project bonus features, a hook that uses local storage to store userSettings.

**How will the form handle both the add and edit modes?:**
The form will handle both modes with the same component with different props. This will cut down on the amount of code needed and eliminate an unnecessary extra component.


## Prerequisites:
- Basic understanding of the following:
    - React Components
    - React Router
    - JavaScript
    - TypeScript
    - Hooks
    - Forms and Validation
    - State Management
    - API Integration
    - Vitest and React Testing Library
    - Deployment


## Main Components:
- **Customers** - A list of customers that is populated by customer data from db.json.

- **Add** - A form that allows you to add customer info to the customer database. Info added with this component will show up in the Customers component.

- **Edit** - A form that allows you to edit the info of a customer that is already in the database


## Data Flow:
1. App fetches data from db.json and populates a list of customers.

2. User can click the Add button to navigate to a form that allows them to add new customer data to the customer database.

3. User can click the Edit button in one of the list items in the main customers list to navigate to a form that allows them to edit the info of an existing customer in the database.

4. User can click the Delete button in one of the list items in the main customers list to delete an existing customer in the database.

5. Database keeps track of customer data and will automatically update based off of user input. It will also automatically assign an id number to each database entry.


## Deployment Model:
- **Frontend**: Deployed to GitHub Pages


## Scalability:
- The customer database will auto-scale as more entries are added.