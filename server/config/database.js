import Sequelize from "sequelize"

const sequelizeConfig = new Sequelize('mydatabase', 'root' , 'nishant' ,{
    host : 'localhost',
    dialect : 'mysql'
})

const connectSequelize = async () => {
    try{
        const connection = await sequelizeConfig.authenticate();
        console.log("connected to sequelize")
        return connection
    }catch(err){
        console.log(err)
    }
} 

export default {
    connectSequelize
}



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
