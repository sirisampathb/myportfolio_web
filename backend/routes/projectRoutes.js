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
    let whereClause = {};

    if (featured === 'true') {
      whereClause.featured = true;
    }

    const projects = await Project.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
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
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
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
    const { title, description, technologies, image, link, featured } = req.body;

    // Validation
    if (!title || !description || !technologies) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and technologies are required',
      });
    }

    // Create new project
    const newProject = await Project.create({
      title,
      description,
      technologies: Array.isArray(technologies) ? technologies : technologies.split(','),
      image: image || null,
      link: link || null,
      featured: featured || false,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
    });
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
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Update project
    await project.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
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
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    await project.destroy();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
