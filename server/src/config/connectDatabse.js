import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()


// const DATABASE_URL = `${process.env.DB_DIALECT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}?sslmode=${process.env.DB_SSL === 'true' ? 'require' : 'disable'}`;
const DATABASE_URL = process.env.DATABASE_URL;
// console.log(DATABASE_URL)
if (!DATABASE_URL) {
    throw new Error('DATABASE_URL không được thiết lập đúng cách.');
}

// const sequelize = new Sequelize(DATABASE_URL);


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('phongtro123', 'root', null, {
    host: 'localhost',
    dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    loggin: false,
});



const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDatabase