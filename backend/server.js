/**
 * Portfolio Website - Backend Server
 * Express.js server with PostgreSQL connection and REST API
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const path = require('path');

const app = express();

// ==================== Middleware ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== Database Connection & Server Start ====================
const PORT = parseInt(process.env.PORT, 10) || 5000;

async function startServer(startPort, maxTries = 10) {
  let port = startPort;
  for (let attempt = 0; attempt < maxTries; attempt++) {
    try {
      const server = await new Promise((resolve, reject) => {
        const s = app.listen(port, () => resolve(s));
        s.on('error', (err) => reject(err));
      });
      console.log(`🚀 Server running on http://localhost:${port}`);
      return { server, port };
    } catch (err) {
      if (err && err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${port} in use, trying ${port + 1}...`);
        port += 1;
        continue;
      }
      throw err;
    }
  }
  throw new Error('Unable to bind to a port after multiple attempts');
}

(async () => {
  try {
    await connectDB();
    await startServer(PORT);
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
})();

// ==================== Routes ====================
// Serve frontend static files
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

app.use('/api/projects', projectRoutes);

// ==================== Health Check ====================
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date() });
});

// ==================== Error Handling ====================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    success: false,
  });
});

// ==================== 404 Handler ====================
// For non-API routes, serve the frontend app (SPA fallback)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', success: false });
});

// (server start handled after DB connect above)