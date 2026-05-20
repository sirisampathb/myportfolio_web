/**
 * Portfolio Website - JavaScript
 * Handles dynamic content loading, navigation, and interactions
 */

// ==================== CONFIGURATION ====================
// Change this to your backend URL based on your environment
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-domain.com/api'
  : 'http://localhost:5000/api';

console.log('📡 API Base URL:', API_BASE_URL);

// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM Content Loaded');
  
  // Initialize app
  setupMobileMenu();
  loadProjects();
  setupSmoothScroll();
  setupActiveNavLink();
});

// ==================== MOBILE MENU ====================
/**
 * Setup mobile hamburger menu
 */
function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ==================== LOAD PROJECTS ====================
/**
 * Fetch projects from the backend API
 */
async function loadProjects() {
  const container = document.getElementById('projects-container');

  try {
    console.log('🔄 Fetching projects from API...');
    
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Projects fetched successfully:', data);

    // Handle API response format
    const projects = data.data || data;

    if (!Array.isArray(projects) || projects.length === 0) {
      container.innerHTML = `
        <div class="error">
          <p>No projects found. Add some projects to your portfolio!</p>
        </div>
      `;
      return;
    }

    displayProjects(projects);
  } catch (error) {
    console.error('❌ Error loading projects:', error);
    displayProjectsError(error.message);
  }
}

// ==================== DISPLAY PROJECTS ====================
/**
 * Display fetched projects on the page
 * @param {Array} projects - Array of project objects
 */
function displayProjects(projects) {
  const container = document.getElementById('projects-container');

  const projectsHTML = projects.map(project => {
    const imageStyle = project.image 
      ? `background-image: url('${project.image}'); background-size: cover; background-position: center;`
      : '';

    const technologiesText = Array.isArray(project.technologies)
      ? project.technologies.join(', ')
      : project.technologies || 'Various Technologies';

    const linkHTML = project.link
      ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>`
      : '<span style="color: #ccc;">Link unavailable</span>';

    return `
      <div class="project-card">
        ${project.image ? `<div class="project-image" style="${imageStyle}" style="height: 200px;"></div>` : ''}
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <p class="technologies"><strong>Tech Stack:</strong> ${escapeHtml(technologiesText)}</p>
        ${linkHTML}
      </div>
    `;
  }).join('');

  container.innerHTML = projectsHTML;
  console.log(`✅ Displayed ${projects.length} projects`);
}

// ==================== ERROR HANDLING ====================
/**
 * Display error message when projects fail to load
 * @param {string} errorMessage - Error message to display
 */
function displayProjectsError(errorMessage) {
  const container = document.getElementById('projects-container');
  
  container.innerHTML = `
    <div class="error">
      <p><strong>⚠️ Error Loading Projects</strong></p>
      <p>${escapeHtml(errorMessage)}</p>
      <p>Please make sure the backend server is running on ${API_BASE_URL.split('/api')[0]}</p>
    </div>
  `;
}

// ==================== SMOOTH SCROLL ====================
/**
 * Setup smooth scrolling for navigation links and buttons
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// ==================== ACTIVE NAV LINK ====================
/**
 * Highlight active navigation link based on scroll position
 */
function setupActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ==================== UTILITY FUNCTIONS ====================
/**
 * Escape HTML special characters to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Format date to readable format
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// ==================== EXPORT FOR TESTING ====================
// Uncomment to export functions for testing
// export { loadProjects, displayProjects, escapeHtml, formatDate };
