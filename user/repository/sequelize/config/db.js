import Sequelize from 'sequelize';
import process from 'process';
import dbConnection from './config.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConnection[env];
const sequelize=new Sequelize(config.database, config.username, config.password, config);


export default sequelize;