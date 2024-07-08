import express from "express";
import dotenv from "dotenv"
import { connectSequelize, sequelizeConfig } from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import DeliveryBoysRouter from "./routes/deliveryboyRoutes.js";
import cors from "cors";    

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT | 5001
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies to be sent and received
};
app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use('/', userRouter)
app.use('/deliveryboy', DeliveryBoysRouter)

async function startServer() {
    try {
        // const connection = await db.connectDB();
        await connectSequelize()
        // await sequelizeConfig.sync({ alter: true });
        // console.log("sync done ... ")
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}
startServer();