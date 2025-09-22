# Blog Application API

A RESTful API for a blog application built with Node.js, Express.js, and MongoDB. This API provides endpoints for user management, blog posts, and comments with JWT authentication.

## Features

### User Management
- User registration with name, email, and password
- User authentication with JWT tokens
- Admin and regular user roles
- Secure password hashing with bcrypt

### Posts Management  
- Create, read, update, and delete blog posts
- Post ownership validation (users can only edit/delete their own posts)
- Admin override (admins can edit/delete any post)
- Posts include author information (name, email)

### Comments System
- Add comments to specific blog posts
- View all comments for a post
- Update and delete comments
- Comment ownership validation
- Admin can moderate any comment

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

1. Clone the repository
```bash
git clone <https://github.com/filsammy/blog-application.git>
cd blog-application-api
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_STRING=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
PORT=3000
```

4. Start the server
```bash
node index.js
```

The API will be available at `http://localhost:3000`

## Test Credentials

### Non-Admin User
- **Email**: `123@mail.com`
- **Password**: `12345678`

### Admin User
- **Email**: `admin@mail.com`
- **Password**: `admin123`

## API Endpoints

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### User Routes (`/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/register` | Register a new user | No |
| POST | `/users/login` | Login user | No |
| GET | `/users/details` | Get logged-in user details | Yes |

#### Register User
```bash
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "isAdmin": false
}
```

#### Login User
```bash
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Post Routes (`/posts`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts` | Get all posts | No |
| GET | `/posts/:postId` | Get single post | No |
| POST | `/posts` | Create new post | Yes |
| PATCH | `/posts/:postId` | Update post | Yes (Owner/Admin) |
| DELETE | `/posts/:postId` | Delete post | Yes (Owner/Admin) |

#### Create Post
```bash
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post..."
}
```

### Comment Routes (`/comments`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/comments/post/:postId` | Get all comments for a post | No |
| POST | `/comments/post/:postId` | Add comment to a post | Yes |
| PATCH | `/comments/:commentId` | Update comment | Yes (Owner/Admin) |
| DELETE | `/comments/:commentId` | Delete comment | Yes (Owner/Admin) |

#### Add Comment
```bash
POST /comments/post/:postId
Authorization: Bearer <token>
Content-Type: application/json

{
  "comment": "Great post! Thanks for sharing."
}
```

## Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": {...}
}
```

### Error Response
```json
{
  "error": {
    "message": "Error description",
    "errorCode": "ERROR_CODE",
    "details": null
  }
}
```

## Authentication Flow

1. Register a new user or use test credentials
2. Login to receive JWT access token
3. Include token in Authorization header for protected routes
4. Token contains user ID, name, email, and admin status

## Authorization

- **Public Routes**: Anyone can access posts and comments for reading
- **Protected Routes**: Require valid JWT token
- **Owner Validation**: Users can only modify their own posts/comments
- **Admin Override**: Admin users can modify any content

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Project Structure

```
├── controllers/
│   ├── user.js
│   ├── post.js
│   └── comment.js
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── routes/
│   ├── user.js
│   ├── post.js
│   └── comment.js
├── auth.js
├── errorHandler.js
├── index.js
└── README.md
```

## License

This project is licensed under the MIT License.
