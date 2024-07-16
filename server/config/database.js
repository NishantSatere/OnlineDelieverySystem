import Sequelize from "sequelize";

const sequelizeConfig = new Sequelize('mydatabase', 'root', 'nishant', {
    host: '127.0.0.1', // Use IPv4 address
    dialect: 'mysql'
});

const connectSequelize = async () => {
    try {
        await sequelizeConfig.authenticate();
        console.log("Connected to Sequelize");
    } catch (err) {
        console.log("Error connecting to Sequelize:", err);
    }
};

export {
    sequelizeConfig,
    connectSequelize
};


// ***** MYSQL ******
// import mysql from 'mysql2';
// import dotenv from 'dotenv';
// dotenv.config();

// const mysqlConfig = {
//     host: process.env.HOST,
//     user: 'root', // Replace with your new MySQL username
//     password: 'nishant', // Replace with the password for 'newuser'
//     database: 'mydatabase' // Optional: Include database name if specified
// };

// const connectDB = async () => {
//     try {
//         const connection = mysql.createConnection(mysqlConfig);
//         await new Promise((resolve, reject) => {
//             connection.connect(err => {
//                 if (err) {
//                     console.error('Error connecting to database:', err);
//                     reject(err);
//                     return;
//                 }
//                 console.log('Connected to the database');
//                 resolve(connection);
//             });
//         });
//         return connection;
//     } catch (e) {
//         console.error('Error connecting to database:', e);
//         throw e; 
//     }
// };

// export default { connectDB };
