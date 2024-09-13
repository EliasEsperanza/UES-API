import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import Sequelize from "sequelize";

const databaseName = process.env.DB_NAME;
const databaseUser = process.env.DB_USER;
const databaseHost = process.env.DB_HOST;
const databaseDialect = process.env.DB_DIALECT;
const databasePort =  process.env.DB_PORT;
const databasePassword = process.env.DB_PASS;


export const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
    host: databaseHost,
    port: databasePort,
    dialect: databaseDialect,
})