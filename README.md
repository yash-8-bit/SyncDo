# SyncDo - 📝 Live ToDo Web App

A sleek and interactive ToDo application featuring a three-column layout — **ToDo** 🟡, **In Progress** 🔵, and **Done** ✅ — with drag-and-drop functionality to easily manage your tasks. The app displays the latest 20 logs in real-time using **Socket.IO** ⚡, keeping you instantly updated on recent activities. Additionally, a **Login and Registration** page has been integrated to ensure secure user authentication.

---

## Project Overview 📋

This project is a modern task management web application designed to help users organize and track their work efficiently. With a simple and intuitive UI, it supports three task states — ToDo, In Progress, and Done — and allows seamless drag-and-drop between columns. Powered by **Socket.IO** ⚡, it provides real-time updates of tasks and logs, ensuring all users see changes immediately without refreshing. Users can securely log in and register, ensuring personalized task management.

---

## Tech Stack Used 🛠️

* **Frontend:** React.js ⚛️, Vanilla CSS 🎨
* **Backend:** Node.js (Express) 🚀
* **Real-time Communication:** Socket.IO ⚡
* **Other:** Drag-and-Drop API 🤚, JWT Authentication 🔐

---

## Setup and Installation Instructions 🖥️

Follow these steps to run the app locally:

### Prerequisites ✅

* Node.js and npm installed on your machine
* Git (optional, for cloning)

### Backend Setup 🏗️

1. Navigate to the Server folder:

   ```bash
   cd Server
   ```
2. Install dependencies:

   ```bash
   pnpm install
   ```
3. Start the backend server:

   ```bash
   pnpm run dev
   ```

   The backend will run on `http://localhost:9999` by default, serving both API and Socket.IO.

### Frontend Setup 💻

1. Navigate to the Client folder:

   ```bash
   cd Client
   ```
2. Install dependencies:

   ```bash
   pnpm install
   ```
3. Start the frontend server:

   ```bash
   pnpm run dev
   ```

   The frontend will open automatically on `http://localhost:5173`.

---

## Features List and Usage Guide 🚀

* **Login & Registration:** Secure user authentication via login and registration pages. 🔐
* **Three Columns:** Tasks are organized into **ToDo** 🟡, **In Progress** 🔵, and **Done** ✅ columns.
* **Drag and Drop:** Move tasks between columns via drag-and-drop to update their status. 🤚
* **Live Logs:** Displays the latest 20 logs detailing recent actions (task created, moved, completed, etc.). 📝
* **Real-Time Updates:** Powered by **Socket.IO** ⚡, all connected users see instant updates of task changes and logs without refreshing.
* **Responsive Design:** Works smoothly on both desktop 💻 and mobile 📱 browsers.

---

## Login & Registration Page 🛂

The **Login and Registration page** is designed to provide secure user authentication.

1. **Login:**

   * Users can log in using their credentials (username and password).
   * Once logged in, users are redirected to the main task management dashboard.
   * If the credentials are incorrect, an error message is displayed.

2. **Registration:**

   * New users can register by providing their email, username, and password.
   * After successful registration, they can log in with their newly created credentials.
   * The system validates email format and password strength for security.

---

### How to Use 🎯

1. **Login/Registration**:

   * Upon launching the app, you'll be prompted to log in or register if you're a new user. 🔐
   * Users can create a new account or use an existing one.

2. Once logged in, you'll have access to the task management features.

3. Add new tasks in the **ToDo** column. ➕

4. Drag tasks to **In Progress** when you start working on them. 🚧

5. Drag completed tasks to **Done**. ✅

6. Watch tasks and logs update live for all connected users via real-time synchronization. 👀⚡

---

## Smart Assign Handling Logic Explanation 🤖

The app features a **smart assignment system** designed to balance the workload fairly among users:

* When you click the **Assign** button on a task, the system assigns that task to the user who currently has the **minimum number of active tasks** (tasks in ToDo or In Progress). ⚖️
* This logic helps distribute tasks evenly and prevents any user from being overloaded. 🏋️‍♂️
* The assignment update triggers a **Socket.IO** ⚡ event, which updates the task assignment in the backend and broadcasts the changes to all connected clients in real-time. 🌐
* All users' task lists and the latest 20 logs update instantly, ensuring everyone sees the current assignment statuses. 👥
* Tasks store the assigned username along with their status, keeping the UI and backend perfectly synchronized. 🔄

---
