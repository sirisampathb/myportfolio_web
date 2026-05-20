# Quick Start Guide

Get your portfolio website running in 5 minutes!

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free)
- Git

## Step 1: Clone & Install (1 min)

```bash
# Navigate to project
cd portfolio-website

# Install dependencies
npm install
```

## Step 2: Setup Database (2 min)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster (takes ~5 minutes)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

## Step 3: Configure Environment

```bash
# Copy example file
cp .env.example .env

# Edit .env and add your MongoDB connection string
# MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxx...
```

## Step 4: Seed Sample Data (30 sec)

```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
✅ Successfully inserted 6 projects
```

## Step 5: Start Backend (1 min)

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
✅ MongoDB Connected
```

## Step 6: Open Frontend

1. Open browser
2. Go to: `http://localhost:5000/frontend` or navigate directly to `frontend/index.html`
3. You should see your projects loaded!

---

## 🎉 Done!

Your portfolio website is running locally!

### Next Steps:

1. **Add More Projects**
   ```bash
   # Use the API to add projects (see README.md)
   curl -X POST http://localhost:5000/api/projects \
     -H "Content-Type: application/json" \
     -d '{"title":"My Project","description":"...","technologies":["Node.js"]}'
   ```

2. **Customize Content**
   - Edit `frontend/index.html` with your information
   - Update colors in `frontend/style.css`

3. **Deploy to Production**
   - See `DEPLOYMENT.md` for detailed instructions

---

## 📱 Test on Different Devices

Resize your browser or use DevTools (F12) to test responsiveness

## 🐛 Troubleshooting

**Port 5000 already in use?**
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

**MongoDB connection error?**
- Check your `.env` MONGO_URI
- Ensure MongoDB Atlas cluster is running
- Whitelist your IP in MongoDB security settings

**Frontend not loading projects?**
- Open browser console (F12)
- Check for CORS errors
- Verify backend is running

---

For more help, see the full `README.md`
