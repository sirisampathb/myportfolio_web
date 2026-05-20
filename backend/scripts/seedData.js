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
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration using Stripe. Features include product search, filtering, order history, and admin dashboard.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'JWT'],
    image: 'https://via.placeholder.com/400x300?text=E-Commerce',
    link: 'https://github.com/yourusername/ecommerce-platform',
    featured: true,
  },
  {
    title: 'Social Media App',
    description: 'A social networking application where users can create profiles, post updates, follow other users, and engage with content through likes and comments. Includes real-time notifications and user messaging.',
    technologies: ['React', 'Firebase', 'Redux', 'Material-UI', 'WebSocket'],
    image: 'https://via.placeholder.com/400x300?text=Social+App',
    link: 'https://github.com/yourusername/social-media-app',
    featured: true,
  },
  {
    title: 'Task Management Application',
    description: 'A collaborative task management tool with features like task creation, assignment, due dates, priority levels, and real-time collaboration. Includes team workspace and activity tracking.',
    technologies: ['Vue.js', 'Express.js', 'PostgreSQL', 'Socket.io', 'Tailwind CSS'],
    image: 'https://via.placeholder.com/400x300?text=Task+Manager',
    link: 'https://github.com/yourusername/task-manager',
    featured: true,
  },
  {
    title: 'Weather Application',
    description: 'A real-time weather application that displays current conditions, forecasts, and weather alerts. Features include location search, multiple location tracking, and weather maps integration.',
    technologies: ['JavaScript', 'OpenWeather API', 'HTML5', 'CSS3', 'Geolocation API'],
    image: 'https://via.placeholder.com/400x300?text=Weather+App',
    link: 'https://github.com/yourusername/weather-app',
    featured: false,
  },
  {
    title: 'Blog Platform',
    description: 'A content management system for creating and managing blog posts. Features include markdown editor, syntax highlighting, comments system, user authentication, and SEO optimization.',
    technologies: ['Next.js', 'PostgreSQL', 'Express.js', 'Markdown-it', 'JWT'],
    image: 'https://via.placeholder.com/400x300?text=Blog+Platform',
    link: 'https://github.com/yourusername/blog-platform',
    featured: false,
  },
  {
    title: 'Fitness Tracker',
    description: 'A personal fitness tracking application that records workouts, tracks progress, sets goals, and provides workout recommendations. Includes progress charts and community features.',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Chart.js', 'Firebase'],
    image: 'https://via.placeholder.com/400x300?text=Fitness+Tracker',
    link: 'https://github.com/yourusername/fitness-tracker',
    featured: false,
  },
];

// Function to connect to database and seed data
async function seedDatabase() {
  try {
    // Connect to database
    console.log('🔗 Connecting to PostgreSQL...');
    await connectDB();
    console.log('✅ Connected to PostgreSQL');

    // Clear existing projects
    console.log('🗑️  Clearing existing projects...');
    await Project.destroy({ where: {} });
    console.log('✅ Cleared existing projects');

    // Insert sample projects
    console.log('📝 Inserting sample projects...');
    const createdProjects = await Project.bulkCreate(sampleProjects);
    console.log(`✅ Successfully inserted ${createdProjects.length} projects`);

    // Display inserted projects
    console.log('\n📋 Projects added:');
    createdProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title} (Featured: ${project.featured})`);
    });

    // Disconnect from database
    console.log('\n🔌 Disconnecting from PostgreSQL...');
    await sequelize.close();
    console.log('✅ Disconnected from PostgreSQL');

    console.log('\n✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
