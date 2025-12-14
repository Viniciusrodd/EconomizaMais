
// imports
import { Sequelize } from "sequelize";

// import env
import dotenv from 'dotenv';
dotenv.config({});


// connection
export const ConnectionDatabase = new Sequelize(
   process.env.DB_NAME!,
   process.env.DB_USER!,
   process.env.DB_PASSWORD!, 
   {
      host: 'localhost',
      dialect: 'mysql',
      timezone: '-03:00'
   }
);