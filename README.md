# **User Management Dashboard**

## Overview

A **User Management Dashboard** built with **React.js**, **Vite.js** and **Tailwind CSS**. This project allows users to **view, add, edit, and delete user details**, implements features like **sorting** user by **ID or Department** and **infinite scrolling** for seamless navigation. The interface is fully responsive and dynamic and includes **error handling** and **client-side validation**.


## **Features**
- **CRUD Operations**: Users can be added, edited, and deleted with a pop-up form.
- **Responsive Design**: The application is fully responsive and works seamlessly on desktops, tablets, and mobile devices.
- **Search Bar**: Search for users according to their **ID, Name, Email or Department**.
- **Sorting**: Users can be sorted based on **ID or Department**.
- **Infinite Scrolling**: Users are dynamically loaded as you scroll down.
- **Client-side Validation**: Ensures correct user input.


## **Tech Stack**
- **Frontend**: React.js, Vite.js, Tailwind CSS
- **Mock API**: JSONPlaceholder API


## **Setup & Installation**

To set up the project locally, follow these steps:

### **1. Clone the Repository**:
    ```
    git clone https://github.com/Kapilgupta20/UserDashboard.git
    ```
### **2️. Navigate to the project directory**:
    ```
    cd UserDashboard
    ```
### **3️. Install dependencies**:
    ```
    npm install
    ```
### **4. Start the development server**:
    ```
    npm run dev
    ```

The project will be available at http://localhost:5173/ (Vite default).


## Usage

- **View Users**: The dashboard lists all users with details.
- **Add User**: Click the "Add User" button, fill out the form, and submit.
- **Edit User**: Click the "Edit" button next to a user, modify the details, and save.
- **Delete User**: Click the "Delete" button to remove a user.
- **Sort Users**: Click the "Sort" button to organize users by ID or Department.


## **Challenges Faced:**

- **Infinite Scrolling Implementation**: Ensuring smooth loading of new users as you scroll down was tricky.
- **Sorting Functionality**: Maintaining a consistent order while allowing dynamic sorting was a bit tricky, especially when users are fetched asynchronously.


## **Future Improvements:**

- **Dark Mode Support**: Add a theme switcher to support dark mode for better accessibility and user experience.
- **Enhanced UI/UX**: Implement more sophisticated animations, transitions, and modal windows to improve user interaction.

### Here's the MOCK API link: `https://my-json-server.typicode.com/Kapilgupta20/jsonserver/users`