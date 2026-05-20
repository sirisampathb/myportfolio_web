/**
 * Seed Database Script
 * Populates PostgreSQL with sample project data
 * Run with: node backend/scripts/seedData.js
 */

require('dotenv').config();
const { sequelize, connectDB } = require('../config/db');
const Project = require('../models/Project');

// Sample projects data
const sampleProjects = [
  {
    title: 'Bharath Heritage',
    description: "A cultural web platform showcasing India's heritage, traditions, and historical places with an interactive UI.",
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://via.placeholder.com/600x400?text=Bharath+Heritage',
    link: 'https://fsad-version-1-2.vercel.app/',
    github: 'https://github.com/sirisampathb/FSAD_Version-1.2',
    featured: true,
  },
  {
    title: 'Job Lane',
    description: "A full-stack job portal where users can search jobs, apply, and manage profiles with authentication.",
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    image: 'https://via.placeholder.com/600x400?text=Job+Lane',
    link: null,
    github: null,
    featured: true,
  },
  {
    title: 'Personal Portfolio',
    description: "A modern responsive portfolio website with dark UI, clean design, and dynamic project integration.",
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://via.placeholder.com/600x400?text=Portfolio',
    link: 'https://myportfolio-web.vercel.app',
    github: 'https://github.com/sirisampathb/myportfolio_web',
    featured: true,
  },
];

// Function to connect to database and seed data
async function seedDatabase() {
  try {
    console.log('🔗 Connecting to PostgreSQL...');
    await connectDB();
    console.log('✅ Connected to PostgreSQL');

    // Clear existing projects
    console.log('🗑️  Clearing existing projects...');
    await Project.destroy({ where: {} });
    console.log('✅ Cleared existing projects');

    // Insert sample projects
    console.log('📝 Inserting sample projects...');
    const createdProjects = await Project.bulkCreate(sampleProjects.map(p => ({
      title: p.title,
      description: p.description,
      technologies: Array.isArray(p.technologies) ? p.technologies : (p.technologies || '').split(',').map(t => t.trim()),
      image: p.image || null,
      link: p.link || null,
      github: p.github || null,
      featured: !!p.featured,
    })));
    console.log(`✅ Successfully inserted ${createdProjects.length} projects`);

    console.log('\n📋 Projects added:');
    createdProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title} (Featured: ${project.featured})`);
    });

    // Close connection
    await sequelize.close();
    console.log('\n✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
