# To-Do List API

This is a RESTful API for managing a simple to-do list application, built using Node.js, Express, MongoDB, and Zod for request validation.

## Features

- Create a new task.
- Fetch all tasks.
- Fetch a task by ID.
- Update the status of a task.
- Delete a task.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or above recommended)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

   bash
   git clone <repository-url>
   cd <repository-folder>
   

2. Install dependencies:

   bash
   npm install
   

3. Set up the MongoDB database:

   - Start your MongoDB server.
   - The app uses mongodb://localhost:27017/todo_app by default. Update this in the mongoose.connect line in the code if necessary.

4. Start the server:

   bash
   npm start
   

   The server will run on http://localhost:3000 by default.

## API Endpoints

### 1. Create a Task

*POST* /tasks

*Request Body:*

json
{
  "title": "Sample Task",
  "description": "This is a sample task."
}


*Response:*

- *201 Created*
- *400 Bad Request* if validation fails.

### 2. Fetch All Tasks

*GET* /tasks

*Response:*

- *200 OK*
- Returns an array of tasks.

### 3. Fetch a Task by ID

*GET* /tasks/:id

*Response:*

- *200 OK*
- *404 Not Found* if the task does not exist.

### 4. Update Task Status

*PUT* /tasks/:id

*Request Body:*

json
{
  "status": "in-progress"
}


*Response:*

- *200 OK*
- *400 Bad Request* if validation fails.
- *404 Not Found* if the task does not exist.

### 5. Delete a Task

*DELETE* /tasks/:id

*Response:*

- *204 No Content*
- *404 Not Found* if the task does not exist.

## Validation Rules

- *Create Task:*

  - title: Required, string.
  - description: Required, string.

- *Update Task:*

  - status: Must be one of pending, in-progress, or completed.

## Project Structure

- index.js: Main application file.
- Models:
  - Task: Mongoose schema for tasks.
- Validation:
  - Zod schemas for request validation.

## Error Handling

- Validation errors return a *400 Bad Request* response with details.
- Internal server errors return a *500 Internal Server Error* response.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
