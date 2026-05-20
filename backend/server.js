import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

/* ================= MODEL ================= */
const Project = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  tech: {
    type: DataTypes.STRING,
  },
  link: {
    type: DataTypes.STRING,
  },
});

/* ================= ROUTES ================= */

// Health check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Get all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add project
app.post("/api/projects", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("✅ Database connected");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("❌ DB error:", err);
});