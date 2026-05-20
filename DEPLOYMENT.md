# Deployment Guide

Complete step-by-step guide to deploy your portfolio website to production.

## 📋 Quick Links

- [Deploy Frontend](#deploy-frontend)
- [Deploy Backend](#deploy-backend)
- [Database Setup](#database-setup)
- [Domain & HTTPS](#domain--https)
- [Post-Deployment](#post-deployment)

---

## 🌐 Deploy Frontend

### Option 1: Vercel (Recommended)

**Best for:** Fast deployment, automatic HTTPS, free tier

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Sign up on Vercel**
   - Go to https://vercel.com
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel

3. **Import Project**
   - Click "Add New" → "Project"
   - Select your portfolio repository
   - Click "Import"

4. **Configure**
   - Framework Preset: "Other"
   - Build Command: (leave empty for static site)
   - Output Directory: `frontend`
   - Environment: Add your backend URL
     ```
     VITE_API_URL=https://your-backend-url.com/api
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - You'll get a URL like: `https://your-portfolio.vercel.app`

6. **Update API URL**
   - Update `API_BASE_URL` in `frontend/script.js` with your backend URL
   - Or use environment variables for dynamic configuration

---

### Option 2: Netlify

**Best for:** Easy deployment, great documentation

1. **Deploy**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and authorize
   - Select your repository

2. **Configure Build**
   - Build command: (leave empty)
   - Publish directory: `frontend`

3. **Environment Variables**
   - Go to Settings → Environment
   - Add: `REACT_APP_API_URL=https://your-backend-url.com/api`

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live at a Netlify URL

---

### Option 3: GitHub Pages

**Best for:** Free, simple projects

1. **Create gh-pages branch**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   git add frontend/
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Click "Pages"
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch

3. **Your site will be available at:**
   ```
   https://yourusername.github.io/portfolio-website/
   ```

---

## 🚀 Deploy Backend

### Option 1: Render (Recommended)

**Best for:** Easy deployment, free tier available

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for backend deployment"
   git push origin main
   ```

2. **Sign up on Render**
   - Go to https://render.com
   - Click "Sign Up"
   - Choose GitHub auth

3. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Select the portfolio-website repo

4. **Configure Service**
   - Name: `portfolio-backend` (or your choice)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Region: Choose closest to you

5. **Add Environment Variables**
   - Click "Environment"
   - Add variables from your `.env` file:
     ```
     MONGO_URI=mongodb+srv://username:password@cluster0.xxx.mongodb.net/portfolio_db
     PORT=5000
     NODE_ENV=production
     ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Get your backend URL: `https://your-service-name.onrender.com`

---

### Option 2: Railway

**Best for:** Quick deployment, generous free tier

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd portfolio-website
   railway init
   ```

4. **Add Environment Variables**
   ```bash
   railway variables set MONGO_URI=mongodb+srv://...
   railway variables set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   railway up
   ```

6. **Get Your URL**
   ```bash
   railway open
   ```

---

### Option 3: Heroku (Legacy but still works)

**Note:** Heroku removed free tier, paid plans start at $7/month

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create your-app-name
   ```

4. **Add Environment Variables**
   ```bash
   heroku config:set MONGO_URI=mongodb+srv://...
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

Already set up for deployment! Just ensure:

1. **Create Production Database**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign in to your account
   - Click "Clusters" in the left sidebar
   - Create a new cluster for production:
     - Cluster Tier: M0 (free) or M5 (paid for production)
     - Cloud Provider: AWS/Google/Azure
     - Region: Choose production-grade region
     - Click "Create Cluster"

2. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Select Node.js driver
   - Copy connection string
   - Add to backend `.env`: `MONGO_URI=...`

3. **Security Settings**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow access from anywhere" (or add specific IPs)
   - Click "Confirm"

4. **Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Set role to "Read and write to any database"

---

## 🌍 Domain & HTTPS

### Connect Custom Domain

#### For Frontend (Vercel)

1. Go to your Vercel project
2. Settings → Domains
3. Add your domain
4. Update DNS records (Vercel will show instructions)

#### For Backend (Render/Railway)

1. Go to service settings
2. Add custom domain
3. Update DNS CNAME record to point to service URL

### Enable HTTPS

- **Vercel:** Automatic with Let's Encrypt
- **Netlify:** Automatic with Let's Encrypt
- **Render:** Automatic SSL certificate
- **Railway:** Automatic HTTPS

---

## ✅ Post-Deployment

### 1. Test Everything

**Frontend Testing:**
- [ ] Site loads without errors
- [ ] All pages display correctly
- [ ] Navigation works
- [ ] Mobile responsive

**Backend Testing:**
- [ ] API endpoints respond
- [ ] Projects load from database
- [ ] Create/update/delete operations work
- [ ] Error handling works

**Integration Testing:**
- [ ] Frontend connects to backend
- [ ] Projects display correctly
- [ ] No CORS errors
- [ ] No console errors

### 2. Performance Monitoring

```bash
# Add monitoring with services like:
- New Relic
- DataDog
- Sentry (error tracking)
```

### 3. Security Checklist

- [ ] Remove console.log statements
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS everywhere
- [ ] Add rate limiting
- [ ] Set secure CORS headers
- [ ] Validate all inputs
- [ ] Use environment variables for secrets

### 4. Update URLs

Update these in your deployment:

**Frontend:**
```javascript
// Change in script.js
const API_BASE_URL = 'https://your-backend-url.com/api';
```

**Backend:**
```javascript
// Add to server.js
app.use(cors({
  origin: 'https://your-frontend-url.com',
  credentials: true
}));
```

### 5. Set Up Monitoring

```bash
# Error tracking
npm install @sentry/node

# Logging
npm install winston

# Performance monitoring
npm install newrelic
```

---

## 🔄 Continuous Deployment

### Set Up Auto-Deploy

**GitHub Actions** (Free)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl -X POST https://api.render.com/deploy/srv-${{ secrets.RENDER_SERVICE_ID }}
```

---

## 📊 Environment Comparison

| Service | Frontend | Backend | Database | Free Tier | HTTPS | Speed |
|---------|----------|---------|----------|-----------|-------|-------|
| Vercel + Render + MongoDB Atlas | ✅ | ✅ | ✅ | Yes* | Yes | ⭐⭐⭐⭐⭐ |
| Netlify + Railway + MongoDB Atlas | ✅ | ✅ | ✅ | Yes* | Yes | ⭐⭐⭐⭐ |
| GitHub Pages + Heroku + MongoDB Atlas | ✅ | ✅ | ✅ | Yes* | Limited | ⭐⭐⭐ |

*Limited free tiers may apply

---

## 🆘 Troubleshooting Deployment

### Frontend Won't Load

1. Check deployment logs
2. Verify build command
3. Check environment variables
4. Ensure all assets are included

### Backend Won't Start

1. Check logs in deployment dashboard
2. Verify MongoDB connection
3. Ensure environment variables are set
4. Check for syntax errors

### CORS Errors

Solution in `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### Database Connection Failed

1. Verify `MONGO_URI` is correct
2. Check MongoDB Atlas cluster status
3. Whitelist IP addresses
4. Check database credentials

---

## 📞 Support

For deployment issues:

1. Check service documentation
2. Review deployment logs
3. Test locally first
4. Check community forums
5. Contact support

**Popular Deployment Communities:**
- Stack Overflow
- GitHub Discussions
- Reddit: r/webdev
- Discord Communities

---

## 🎉 Congratulations!

Your portfolio is now live! Share it with:

- [ ] LinkedIn
- [ ] Twitter/X
- [ ] GitHub
- [ ] Your Resume
- [ ] Portfolio Platforms

**Example Links to Share:**
- Frontend: `https://your-portfolio.com`
- Backend API: `https://api.your-portfolio.com/api/projects`
- GitHub: `https://github.com/yourusername/portfolio-website`

---

Last updated: January 2025
