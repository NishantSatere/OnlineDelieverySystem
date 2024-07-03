import express from "express";
import dotenv from "dotenv"
import connectSequelize from "./config/database.js";

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT | 5001 



async function startServer() {
    try {
        // const connection = await db.connectDB();
        const db  = await connectSequelize()
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}
startServer();