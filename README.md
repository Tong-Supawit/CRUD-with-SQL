# CRUD-with-SQL

A full-stack CRUD (Create, Read, Update, Delete) application using **React**, **Redux**, **React Router DOM**, and **Axios** on the frontend, and **Node.js**, **Express.js**, and **Sequelize** on the backend. This application allows user registration, login, password updates, and managing user data with JWT-based authentication.

## Features

### Frontend (React, Redux, Axios, React Router DOM):
- **User Registration and Login** - Users can register and log in through a React form with state management using Redux.
- **Authenticated Routing** - Protect routes using React Router DOM to ensure only authenticated users can access certain pages.
- **Axios** - Perform API requests with JWT tokens for authentication and secure access to protected routes.
- **State Management** - Use Redux to manage the application's global state, particularly for handling authentication, login/logout, and token management.

### Backend (Node.js, Express.js, Sequelize):
- **Create** - Register new users and store their information in an SQL database.
- **Read** - Fetch user information (admin-only access).
- **Update** - Allow authenticated users to update their passwords.
- **Delete** - Admins can delete users from the system.
- **JWT-based authentication** - Secure API routes using JWT tokens for user authentication.
- **Token refresh** - Use refresh tokens to maintain user sessions without re-authentication.

## API Endpoints (Backend)
- **Register**: `POST /register` - Register a new user.
- **Login**: `POST /login` - Log in a user and issue access and refresh tokens.
- **Update Password**: `PUT /updateUser` - Update the user password.
- **Fetch User Data**: `GET /getDataUser` - Fetch user data (admin only).
- **Delete User**: `DELETE /deleteUser/:id` - Delete a user (admin only).
