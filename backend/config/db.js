const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * PostgreSQL Database Connection
 * Using Sequelize ORM
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || 'portfolio_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'Siri@2007',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

/**
 * Test database connection
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected');
    
    // Sync all models with database (creates tables if they don't exist)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database Models Synced');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };