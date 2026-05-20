/**
 * Project Routes
 * REST API endpoints for managing projects
 */

const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// ==================== GET All Projects ====================
/**
 * GET /api/projects
 * Fetch all projects from the database
 * Optional query: featured=true (only featured projects)
 */
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = {};
    if (featured === 'true') filter.featured = true;
    const projects = await Project.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==================== GET Single Project ====================
/**
 * GET /api/projects/:id
 * Fetch a specific project by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==================== CREATE New Project ====================
/**
 * POST /api/projects
 * Create a new project
 * Body: { title, description, technologies, image, link, featured }
 */
router.post('/', async (req, res) => {
  try {
    const { title, description, technologies, image, link, github, featured } = req.body;

    // Validation
    if (!title || !description || !technologies) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and technologies are required',
      });
    }

    // Create new project
    const techs = Array.isArray(technologies)
      ? technologies
      : (typeof technologies === 'string' && technologies.length ? technologies.split(',').map((t) => t.trim()) : []);

    // Normalize link/github: treat empty, '#', 'none', 'n/a' as null
    const normalize = (val) => {
      if (!val) return null;
      if (typeof val !== 'string') return val;
      const v = val.trim();
      if (!v) return null;
      const lower = v.toLowerCase();
      if (lower === '#' || lower === 'none' || lower === 'n/a' || lower === 'null') return null;
      return v;
    };

    const cleanLink = normalize(link);
    const cleanGithub = normalize(github);

    // Validate URLs when provided
    const isValidUrl = (str) => {
      try {
        // requires absolute URL (with protocol)
        new URL(str);
        return true;
      } catch (e) {
        return false;
      }
    };

    if (cleanLink && !isValidUrl(cleanLink)) {
      return res.status(400).json({ success: false, message: 'Invalid URL for link' });
    }
    if (cleanGithub && !isValidUrl(cleanGithub)) {
      return res.status(400).json({ success: false, message: 'Invalid URL for github' });
    }

    const newProject = new Project({ title, description, technologies: techs, image: normalize(image), link: cleanLink, github: cleanGithub, featured: !!featured });
    await newProject.save();

    res.status(201).json({ success: true, message: 'Project created successfully', data: newProject });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// ==================== UPDATE Project ====================
/**
 * PUT /api/projects/:id
 * Update an existing project
 * Body: { title, description, technologies, image, link, featured }
 */
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const { title, description, technologies, image, link, github, featured } = req.body;

    const normalize = (val) => {
      if (!val) return null;
      if (typeof val !== 'string') return val;
      const v = val.trim();
      if (!v) return null;
      const lower = v.toLowerCase();
      if (lower === '#' || lower === 'none' || lower === 'n/a' || lower === 'null') return null;
      return v;
    };

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (technologies !== undefined) project.technologies = Array.isArray(technologies) ? technologies : (typeof technologies === 'string' && technologies.length ? technologies.split(',').map(t => t.trim()) : []);
    if (image !== undefined) project.image = normalize(image);
    if (link !== undefined) {
      const normalizedLink = normalize(link);
      if (normalizedLink && !isValidUrl(normalizedLink)) return res.status(400).json({ success: false, message: 'Invalid URL for link' });
      project.link = normalizedLink;
    }
    if (github !== undefined) {
      const normalizedGithub = normalize(github);
      if (normalizedGithub && !isValidUrl(normalizedGithub)) return res.status(400).json({ success: false, message: 'Invalid URL for github' });
      project.github = normalizedGithub;
    }
    if (featured !== undefined) project.featured = !!featured;

    await project.save();
    res.status(200).json({ success: true, message: 'Project updated successfully', data: project });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// ==================== DELETE Project ====================
/**
 * DELETE /api/projects/:id
 * Delete a project by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    await project.remove();
    res.status(200).json({ success: true, message: 'Project deleted successfully', data: project });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
