﻿# Task Management Application

A full-stack task management application built with Express.js for the backend API and React for the frontend UI. This application allows users to create, edit, delete, and mark tasks as completed, with data persistence using MongoDB.

## Features

- Create new tasks with title, description, and completion status
- View a list of all tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed or incomplete
- Data persistence with MongoDB

## Tech Stack

- **Frontend**: React, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Development Tools**: TypeScript, Vite

## Setup Instructions

### Prerequisites

- Node.js 
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   git clone <https://github.com/kunj078/TaskManagment.git>
   cd task-management-app

2. Install dependencies:
   npm install

3. Set up environment variables (optional):
   
   Create a `.env` file in the root directory and add the following:
   MONGO_URI=mongodb://your-mongodb-connection-string
   PORT=5000
   
### Running the Application

#### Development Mode
npm run dev
This will start both the Express server and the React frontend using Vite's development server.

#### Production Build
npm run build
npm start

This will build the frontend assets and start the production server.

## API Endpoints

The following API endpoints are available:

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and configuration
│   │   ├── pages/        # Application pages
│   │   ├── App.tsx       # Main application component
│   │   └── main.tsx      # Entry point
├── server/               # Backend Express application
│   ├── models/           # MongoDB models
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage interface and implementation
│   └── vite.ts           # Vite configuration for development
├── shared/               # Shared code between client and server
│   └── schema.ts         # Data schemas and types
└── various config files
```

### UI Screenshot
1. Dashboard
   ![image](https://github.com/user-attachments/assets/7f14e55f-263a-4889-b0a9-1f321f998228)

2. Task added
   ![image](https://github.com/user-attachments/assets/82f185bc-525c-48ed-8eec-c6ef4d4dc2d3)

3. Task Added Scessfully
   ![image](https://github.com/user-attachments/assets/aada7f23-a916-4f31-a2e7-e7fb93492b22)

4. Task Delete Scessfully
   ![image](https://github.com/user-attachments/assets/db6d9076-4083-41f8-9f86-1b764f4b49a6)
   ![image](https://github.com/user-attachments/assets/75c132ed-b40a-4e66-81d1-dd3a9e2c85c1)

