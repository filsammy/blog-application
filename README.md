# Blog Application

A full-stack blog application built with React.js frontend and Node.js/Express backend. This application allows users to create, read, update, and delete blog posts with a complete comment system and user authentication.

## Features

### Frontend (React.js)
- **Modern UI**: Built with React Bootstrap for responsive design
- **User Authentication**: Login/Register with JWT tokens
- **Blog Management**: Create, edit, and delete blog posts
- **Comments System**: Add, edit, and delete comments on posts
- **Role-Based Access**: Different permissions for admin and regular users
- **Gothic Theme**: Custom dark theme with horror-inspired styling
- **Real-time Notifications**: Toast notifications for user feedback

### Backend (Node.js/Express)
- **RESTful API**: Clean API structure with proper HTTP methods
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Integration**: Database with Mongoose ODM
- **Role Management**: Admin and regular user roles
- **Data Validation**: Input validation and error handling
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **React Bootstrap** - UI components
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB Atlas** account or local MongoDB installation
- **Git** for version control

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd blog-application
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with the following variables:
# MONGODB_STRING=your_mongodb_connection_string
# JWT_SECRET_KEY=your_jwt_secret_key
# PORT=4000

# Start the backend server
npm start
# or
node index.js
```

The backend server will run on `http://localhost:4000`

### 3. Frontend Setup
```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install

# Start the React development server
npm start
```

The React app will run on `http://localhost:3000` and automatically open in your browser.

## Test Credentials

### Regular User
- **Email**: `123@mail.com`
- **Password**: `12345678`

### Admin User
- **Email**: `admin@mail.com`
- **Password**: `admin123`

## Project Structure

```
blog-application/
├── client/                          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── BlogCard.js
│   │   │   └── Notification.js
│   │   ├── context/                 # React context
│   │   │   └── AuthContext.js
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.js
│   │   │   ├── BlogList.js
│   │   │   ├── SingleBlog.js
│   │   │   ├── CreateBlog.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── services/                # API services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── blogService.js
│   │   │   └── commentService.js
│   │   ├── styles/                  # CSS files
│   │   │   └── App.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── server/                          # Node.js backend
│   ├── controllers/                 # Route controllers
│   │   ├── user.js
│   │   ├── post.js
│   │   └── comment.js
│   ├── models/                      # Database models
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/                      # API routes
│   │   ├── user.js
│   │   ├── post.js
│   │   └── comment.js
│   ├── auth.js                      # Authentication middleware
│   ├── errorHandler.js              # Error handling middleware
│   ├── index.js                     # Main server file
│   ├── .env                         # Environment variables
│   ├── package.json
│   └── README.md
└── README.md                        # This file
```

## 🔌 API Endpoints

### User Routes (`/users`)
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/details` - Get user details (auth required)

### Post Routes (`/posts`)
- `GET /posts` - Get all posts
- `GET /posts/:postId` - Get single post
- `POST /posts` - Create post (auth required)
- `PATCH /posts/:postId` - Update post (auth required, owner/admin)
- `DELETE /posts/:postId` - Delete post (auth required, owner/admin)

### Comment Routes (`/comments`)
- `GET /comments/post/:postId` - Get comments for post
- `POST /comments/post/:postId` - Add comment (auth required)
- `PATCH /comments/:commentId` - Update comment (auth required, owner/admin)
- `DELETE /comments/:commentId` - Delete comment (auth required, owner/admin)

## Features in Detail

### Authentication System
- JWT-based authentication with automatic token handling
- Persistent login state with localStorage
- Protected routes and conditional rendering
- Role-based access control (Admin/User)

### Blog Management
- Rich text content support
- Author information display
- Creation and modification timestamps
- Owner and admin deletion rights

### Comment System
- Nested comments on blog posts
- Real-time comment addition
- Edit and delete functionality
- User identification for comments

### UI/UX Features
- Responsive design for all screen sizes
- Dark gothic theme with custom styling
- Loading states and error handling
- Toast notifications for user feedback
- Intuitive navigation and routing

## 🔧 Available Scripts

### Frontend (client directory)
```bash
npm start          # Runs development server
npm run build      # Creates production build
npm test           # Runs test suite
npm run eject      # Ejects from Create React App
```

### Backend (server directory)
```bash
npm start          # Starts the server
node index.js      # Alternative start command
```

## Environment Variables

### Frontend (.env in client directory)
```env
# For local development
REACT_APP_API_URL=http://localhost:4000

# For production (set in Vercel dashboard)
REACT_APP_API_URL=https://your-render-backend-url.onrender.com
```

### Backend (.env in server directory)
```env
# Database connection
MONGODB_STRING=mongodb+srv://username:password@cluster.mongodb.net/blogdb

# JWT secret (use a strong, unique key for production)
JWT_SECRET_KEY=your-super-secure-jwt-secret-key

# Port (Render uses PORT environment variable automatically)
PORT=4000

# Environment
NODE_ENV=development
```

### Render Environment Variables
When deploying to Render, set these in the dashboard:
```env
MONGODB_STRING=mongodb+srv://username:password@cluster.mongodb.net/blogdb
JWT_SECRET_KEY=your-production-jwt-secret-key
NODE_ENV=production
```
*Note: PORT is automatically set by Render*

## 🚀 Deployment

### Frontend Deployment (Vercel)

#### Method 1: GitHub Integration (Recommended)
1. Push your code to GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project" and import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client` (if your React app is in client folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add environment variables in Vercel dashboard:
   ```
   REACT_APP_API_URL=https://your-render-backend-url.onrender.com
   ```
6. Deploy! Vercel will auto-deploy on every push to main branch

#### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to your client directory
cd client

# Deploy
vercel

# Follow the prompts and configure as needed
```

### Backend Deployment (Render)

#### Step-by-Step Render Deployment:
1. Push your backend code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `blog-app-backend` (or your preferred name)
   - **Root Directory**: `server` (if your backend is in server folder)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` or `node index.js`
   - **Instance Type**: Free (or paid for better performance)

6. Add Environment Variables in Render dashboard:
   ```
   MONGODB_STRING=mongodb+srv://username:password@cluster.mongodb.net/blogdb
   JWT_SECRET_KEY=your-super-secure-jwt-secret-key-for-production
   PORT=10000
   NODE_ENV=production
   ```

7. Deploy! Render will build and deploy your backend

### Post-Deployment Configuration

#### Update API Base URL
After deploying to Render, update your frontend API configuration:

```javascript
// src/services/api.js
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://your-app-name.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
```

#### CORS Configuration (Backend)
Make sure your backend allows requests from your Vercel domain:

```javascript
// In your server index.js or where CORS is configured
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000', // for development
    'https://your-vercel-app.vercel.app', // your Vercel URL
    'https://your-custom-domain.com' // if you have a custom domain
  ],
  credentials: true
}));
```

### Live URLs
- **Frontend (Vercel)**: `https://your-app-name.vercel.app`
- **Backend (Render)**: `https://your-app-name.onrender.com`

### Important Notes
- **Render Free Tier**: Backend may sleep after 15 minutes of inactivity (first request may be slow)
- **MongoDB Atlas**: Ensure your MongoDB allows connections from anywhere (0.0.0.0/0) for Render
- **Environment Variables**: Never commit `.env` files - always use platform dashboard for secrets
- **Build Times**: Render builds can take 2-5 minutes, Vercel builds are typically under 1 minute

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your backend CORS configuration includes your Vercel URL
2. **Database Connection**: Verify MongoDB connection string and network access (whitelist 0.0.0.0/0 for Render)
3. **JWT Token Issues**: Check if token is properly stored in localStorage
4. **API Connection**: Ensure REACT_APP_API_URL is correctly set in Vercel environment variables
5. **Render Cold Starts**: First request after inactivity may take 30+ seconds on free tier

### Deployment Issues

#### Vercel Issues:
- **Build Fails**: Check if `client` directory has correct build scripts
- **API Calls Fail**: Verify `REACT_APP_API_URL` environment variable
- **Routing Issues**: May need to add `vercel.json` for client-side routing

#### Render Issues:
- **Build Fails**: Check build logs in Render dashboard
- **App Won't Start**: Verify start command is `node index.js` or `npm start`
- **Database Connection**: Ensure MongoDB Atlas allows all IP addresses (0.0.0.0/0)
- **Environment Variables**: Double-check all required env vars are set in dashboard

### Development vs Production
- **Local**: Backend on `localhost:4000`, Frontend on `localhost:3000`
- **Production**: Backend on Render, Frontend on Vercel with API_URL pointing to Render

### Getting Help

If you encounter any issues:
1. Check browser console and network tab for errors
2. Review Render build/runtime logs
3. Verify all environment variables are set correctly
4. Test API endpoints directly using Postman or browser
5. Check MongoDB Atlas network access settings

## Support

For support, email your-email@example.com or create an issue in the GitHub repository.

---

Built with using React and Node.js
