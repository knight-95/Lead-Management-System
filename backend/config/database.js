import { Sequelize } from 'sequelize';

// Destructure environment variables
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// Creating Sequelize instance with pool configuration
const sequelize = new Sequelize(DB_NAME || 'udaan_backend', DB_USER || 'root', DB_PASSWORD || 'root@123', {
  host: DB_HOST || '127.0.0.1',
  dialect: 'mysql',
  port: DB_PORT || 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false, // Turn off SQL logging for cleaner output
});

// Export the Sequelize instance
export default sequelize;
