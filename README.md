# 🎨 Personal Portfolio Website

A **production-ready, full-stack personal portfolio website** built with modern technologies. Showcase your projects, skills, and experience to potential employers and clients.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment Guide](#deployment-guide)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Frontend
- ✅ **Responsive Design** - Works seamlessly on all devices (mobile, tablet, desktop)
- ✅ **Modern UI** - Clean, professional design with smooth animations
- ✅ **Dynamic Content** - Projects fetched from backend API in real-time
- ✅ **Smooth Navigation** - Smooth scrolling and active link highlighting
- ✅ **SEO Optimized** - Meta tags and proper HTML structure
- ✅ **Performance** - Fast loading times with optimized assets

### Backend
- ✅ **RESTful API** - Complete CRUD operations for projects
- ✅ **MongoDB Integration** - Persistent data storage with Mongoose ODM
- ✅ **Error Handling** - Comprehensive error handling and validation
- ✅ **CORS Enabled** - Secure cross-origin requests
- ✅ **Environment Variables** - Secure configuration management
- ✅ **Health Check** - API health monitoring endpoint

### Database
- ✅ **MongoDB Atlas** - Cloud-hosted NoSQL database
- ✅ **Mongoose Schema Validation** - Data type and requirement validation
- ✅ **Timestamps** - Automatic creation and update tracking

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and Grid/Flexbox
- **JavaScript (ES6+)** - Dynamic functionality and API integration
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational SQL database
- **Sequelize** - ORM for PostgreSQL
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing

### Tools & Services
- **PostgreSQL** - Local or cloud hosted
- **Postman** - API testing
- **Git & GitHub** - Version control
- **VS Code** - Code editor
- **pgAdmin** - PostgreSQL management (optional)

---

## 📁 Project Structure

```
portfolio-website/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection configuration
│   ├── models/
│   │   └── Project.js            # Project schema and model
│   ├── routes/
│   │   └── projectRoutes.js      # API endpoints
│   ├── server.js                 # Express server setup
│   └── package.json              # Backend dependencies
│
├── frontend/
│   ├── index.html                # Main HTML file
│   ├── style.css                 # Stylesheet
│   ├── script.js                 # JavaScript logic
│   └── assets/
│       └── images/               # Project images (optional)
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore file
├── package.json                  # Main dependencies
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **npm** (comes with Node.js) or **yarn**
3. **Git** - [Download](https://git-scm.com/)
4. **MongoDB Atlas Account** - [Create Free Account](https://www.mongodb.com/cloud/atlas)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/portfolio_db
   PORT=5000
   NODE_ENV=development
   ```

4. **Seed Sample Data (Optional)**
   ```bash
   node backend/scripts/seedData.js
   ```

5. **Start the Backend Server**
   ```bash
   # Development with auto-reload
   npm run dev
   
   # Production
   npm start
   ```

6. **Test the Backend**
   - Open your browser and visit: `http://localhost:5000/api/health`
   - You should see: `{ "message": "Server is running", "timestamp": "..." }`

7. **Open Frontend**
   - Open [index.html](frontend/index.html) in your browser or use a local server:
   ```bash
   cd frontend
   python -m http.server 8000  # Python 3
   # or
   npx http-server            # Node.js
   ```

---

## 🔧 Backend Setup

### Database Connection

The backend connects to MongoDB Atlas. Here's how to set it up:

#### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster
4. Wait for cluster deployment (5-10 minutes)

#### Step 2: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" as driver
4. Copy the connection string
5. Replace `<username>` and `<password>` with your credentials
6. Add database name at the end: `...mongodb.net/portfolio_db`

#### Step 3: Configure Environment

Paste your connection string in `.env`:
```
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority
```

### Project Model

The **Project** model has the following fields:

```javascript
{
  _id: ObjectId,
  title: String (required, max 100 chars),
  description: String (required, max 500 chars),
  technologies: [String] (required),
  image: String (optional URL),
  link: String (optional URL),
  featured: Boolean (default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Example Project Document

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "E-Commerce Platform",
  "description": "A full-stack e-commerce platform with user authentication, product catalog, and payment integration.",
  "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
  "image": "https://example.com/ecommerce.jpg",
  "link": "https://ecommerce-demo.com",
  "featured": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

## 📱 Frontend Setup

### Structure

The frontend is a **single-page application (SPA)** with sections:

1. **Navigation Bar** - Sticky header with smooth scroll links
2. **Hero Section** - Welcome message and call-to-action
3. **Projects Section** - Dynamically loaded from API
4. **About Section** - Skills and technologies
5. **Contact Section** - Contact information and links
6. **Footer** - Copyright and credits

### Customization

To customize your portfolio:

1. **Personal Information** - Edit the HTML sections
2. **Colors** - Modify CSS variables in `style.css` (`:root` section)
3. **API URL** - Change `API_BASE_URL` in `script.js`
4. **Logo** - Replace text with image in navigation

### Example Color Customization

Edit [style.css](frontend/style.css):
```css
:root {
  --primary-color: #3498db;      /* Main color */
  --secondary-color: #2c3e50;    /* Dark color */
  --accent-color: #e74c3c;       /* Highlight color */
}
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. **Health Check**
```http
GET /api/health
```
**Response:**
```json
{
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

#### 2. **Get All Projects**
```http
GET /api/projects
```

**Query Parameters:**
- `featured` (optional) - Filter featured projects: `true` or `false`

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Project Name",
      "description": "Project description",
      "technologies": ["React", "Node.js"],
      "image": "https://...",
      "link": "https://...",
      "featured": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

#### 3. **Get Single Project**
```http
GET /api/projects/:id
```

**Path Parameters:**
- `id` (required) - Project MongoDB ID

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

#### 4. **Create Project**
```http
POST /api/projects
Content-Type: application/json

{
  "title": "My New Project",
  "description": "A brief description of the project",
  "technologies": ["React", "Node.js", "MongoDB"],
  "image": "https://example.com/image.jpg",
  "link": "https://project.com",
  "featured": false
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": { ... }
}
```

---

#### 5. **Update Project**
```http
PUT /api/projects/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  ...
}
```

---

#### 6. **Delete Project**
```http
DELETE /api/projects/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## 🗄️ Database Schema

### Project Collection

```javascript
const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  technologies: {
    type: [String],
    required: true
  },
  image: String,
  link: String,
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
```

### Sample Data

Insert sample projects for testing:

```javascript
db.projects.insertMany([
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website to showcase projects and skills",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    image: "https://via.placeholder.com/300",
    link: "https://github.com/yourusername/portfolio-website",
    featured: true
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce platform with payment integration",
    technologies: ["React", "Express", "MongoDB", "Stripe"],
    image: "https://via.placeholder.com/300",
    link: "https://ecommerce-demo.com",
    featured: true
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    image: "https://via.placeholder.com/300",
    link: "https://task-app-demo.com",
    featured: false
  }
]);
```

---

## 🚀 Deployment Guide

### Option 1: Deploy Frontend on Vercel

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Update API URL**
   - Create `.env.production` with your backend URL
   - Or update `API_BASE_URL` in `script.js` before deploying

### Option 2: Deploy Frontend on Netlify

1. **Build the site** (if using build tools)
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop `frontend` folder, or
   - Connect GitHub repository for automatic deployments

### Option 3: Deploy Backend on Render

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [Render](https://render.com)
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables (copy from `.env`)
   - Click "Create Web Service"

### Option 4: Deploy Backend on Railway

1. **Connect GitHub**
   - Go to [Railway](https://railway.app)
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Authorize and select your repository

2. **Configure**
   - Add environment variables
   - Set start command: `npm start`
   - Click "Deploy"

### Database Deployment (MongoDB Atlas)

MongoDB Atlas is already cloud-hosted! No additional setup needed.

---

## 🧪 Testing

### Manual API Testing with Postman

1. **Download Postman** - [Download Link](https://www.postman.com/downloads/)

2. **Create Requests**

   **GET All Projects:**
   - Method: GET
   - URL: `http://localhost:5000/api/projects`
   - Click "Send"

   **POST New Project:**
   - Method: POST
   - URL: `http://localhost:5000/api/projects`
   - Body (JSON):
   ```json
   {
     "title": "Test Project",
     "description": "A test project",
     "technologies": ["JavaScript", "Node.js"],
     "image": "https://via.placeholder.com/300",
     "link": "https://example.com"
   }
   ```
   - Click "Send"

### Testing Frontend

1. Open `frontend/index.html` in browser
2. Check browser console (F12) for any errors
3. Verify projects load from API
4. Test navigation and smooth scrolling
5. Test responsive design (resize browser window)

### Testing Checklist

- [ ] Backend server starts without errors
- [ ] API endpoints respond correctly
- [ ] Frontend loads and displays projects
- [ ] Projects fetch from API
- [ ] Navigation links work
- [ ] Mobile responsive (test on mobile device)
- [ ] No console errors
- [ ] API error handling works

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: "Cannot find module 'express'"**
- Solution: Run `npm install` in project root

**Problem: "MongoDB connection failed"**
- Check your `.env` file has correct `MONGO_URI`
- Verify MongoDB Atlas cluster is running
- Whitelist your IP in MongoDB Atlas security settings

**Problem: "CORS error when fetching from frontend"**
- Ensure backend has CORS enabled
- Check CORS configuration in `server.js`
- Verify frontend URL in environment

### Frontend Issues

**Problem: "API returning 404 or connection refused"**
- Verify backend server is running
- Check `API_BASE_URL` in `script.js`
- Ensure port number is correct (5000)

**Problem: "Projects not displaying"**
- Check browser console for errors
- Verify API response format
- Check that MongoDB has project data

**Problem: "Styling looks broken"**
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file path in HTML
- Verify CSS variables are defined

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `MongooseError: Cannot connect` | MongoDB connection string invalid | Check MONGO_URI in .env |
| `EADDRINUSE: address already in use` | Port 5000 already in use | Change PORT in .env or kill process using port |
| `SyntaxError: Unexpected token` | JSON parsing error | Use JSON formatter to validate data |
| `Cannot GET /api/projects` | Wrong API route | Check route path in projectRoutes.js |

---

## 📚 Learning Resources

### Frontend
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript Info](https://javascript.info/)

### Backend
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)

### Deployment
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app/)

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

## ✅ Checklist Before Deployment

- [ ] All environment variables configured
- [ ] MongoDB Atlas cluster created and whitelisted
- [ ] Backend tested locally with Postman
- [ ] Frontend displays projects correctly
- [ ] No console errors in browser
- [ ] Mobile responsive design verified
- [ ] Project images optimized
- [ ] Contact links updated with real information
- [ ] README updated with your information
- [ ] Repository pushed to GitHub
- [ ] Deployment services configured
- [ ] Custom domain (optional) set up

---

## 📞 Support

For issues and questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [API Documentation](#api-documentation)
3. Check existing GitHub issues
4. Create a new issue with detailed description

---

**Happy coding! 🚀**

Last updated: January 2025
"# myportfolio_web" 
