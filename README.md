# Task Manager App

## Overview
The Task Manager App is a full-stack web application that helps users create, organize, and manage their tasks efficiently. Users can add tasks, update their status, set due dates, and delete completed tasks. The app ensures a seamless user experience with a clean and intuitive UI.

## Features
- User authentication (Signup/Login)
- Create, update, delete, and manage tasks
- Set task priority and due dates
- Filter and search tasks
- Dark mode toggle for better UI experience
- Mobile-friendly and responsive design

## Technologies Used
### Frontend:
- React.js
- HTML5, CSS3, Bootstrap
- React Router for navigation

### Backend:
- Node.js with Express.js
- MongoDB for database storage
- JWT for authentication

## Installation
### Prerequisites:
- Node.js and npm installed
- MongoDB instance running locally or in the cloud

### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/Primahale/Task_Manger.git
   cd Task_Manger
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. Start the backend server using nodemon:
   ```sh
   npm run dev
   ```

5. Navigate to the `frontend` folder and install dependencies:
   ```sh
   cd frontend
   npm install
   ```

6. Start the frontend application:
   ```sh
   npm start
   ```

7. Open `http://localhost:3000` on browser.

## API Endpoints
### Authentication:
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate user and return token

### Tasks:
- `GET /api/tasks` - Retrieve all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

## Deployment
- The backend is deployed on Render.
- The frontend is deployed on Vercel.


