const dbConnection = {

  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'ums',
  host: process.env.DB_HOST,
  port: 3306,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,

  }

};

export default dbConnection;
