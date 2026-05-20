const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * PostgreSQL Database Connection using Sequelize
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || 'portfolio_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
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

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected');

    // Sync models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database Models Synced');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message || error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };