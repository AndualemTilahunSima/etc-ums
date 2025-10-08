import Sequelize from 'sequelize';
import process from 'process';
import dbConnection from './config.js';

const config = dbConnection;
const sequelize=new Sequelize(config.database, config.username, config.password, config);


export default sequelize;