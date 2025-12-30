# Mini User Management System

## Project Overview
This is a full-stack **User Management System** built as part of the Backend Developer Intern assessment for **Purple Merit Technologies**.  
The application supports secure user authentication, role-based access control (RBAC), and complete user lifecycle management.  
Admins can manage users, while normal users can manage their own profiles.

The system demonstrates clean backend architecture, secure APIs, modern frontend UX, and production-ready deployment practices.

---

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **JWT Authentication**
- **bcrypt**
- **Swagger (OpenAPI)**

### Frontend
- **React (Vite)**
- **Redux Toolkit**
- **React Router**
- **Axios**
- **Tailwind CSS (Dark Theme)**
- **react-hot-toast**

### Deployment
- **Backend:** Render / Railway
- **Frontend:** Vercel / Netlify
- **Database:** MongoDB Atlas

---

## Features

### Authentication
- User signup & login
- JWT-based authentication
- Secure password hashing
- Persistent login across refresh

### Authorization
- Role-based access control (Admin / User)
- Protected routes
- Admin-only endpoints

### User Management
- View & update profile
- Change password
- Admin can view all users
- Admin can activate / deactivate users
- Pagination support

### UI/UX
- Responsive dark theme UI
- Toast notifications
- Optimistic UI updates
- Mobile-friendly layouts

---

## Project Structure

```
root
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── features
│   │   ├── api
│   │   └── App.jsx
│   └── vite.config.js
│
├── backend
│   ├── src
│   │   ├── routes
│   │   ├── controllers
│   │   ├── models
│   │   ├── middlewares
│   │   ├── config
│   │   └── app.js
│   └── server.js
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Git

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

Backend runs on:
```
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## Deployment Instructions

### Backend (Render / Railway)
1. Create a new Web Service
2. Connect GitHub repository
3. Set environment variables
4. Build command:
   ```bash
   npm install
   ```
5. Start command:
   ```bash
   npm start
   ```

### Frontend (Vercel / Netlify)
1. Import GitHub repository
2. Set root directory to `frontend`
3. Set environment variable:
   ```env
   VITE_API_URL=https://your-backend-url
   ```
4. Deploy

---

## API Documentation

Swagger UI available at:

```
/api-docs
```

### Auth APIs

#### Signup
```
POST /api/auth/signup
```
Request:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```
POST /api/auth/login
```
Response:
```json
{
  "token": "jwt_token",
  "user": {
    "id": "...",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

---

### Admin APIs

#### Get All Users
```
GET /api/admin/users?page=1
```

#### Update User Status
```
PATCH /api/admin/users/:id/status
```

Request:
```json
{
  "status": "active"
}
```

---

### User APIs

#### Get Profile
```
GET /api/user/profile
```

#### Update Profile
```
PUT /api/user/profile
```

#### Change Password
```
PUT /api/user/change-password
```

---


---

## Author
**Prabal Baijal**  
Backend Developer Intern Assessment – December 2025
