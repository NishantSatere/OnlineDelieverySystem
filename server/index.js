import express from "express";
import dotenv from "dotenv"
import { connectSequelize, sequelizeConfig } from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import DeliveryBoysRouter from "./routes/deliveryboyRoutes.js";
import OrderProducts from "./models/OrderProducts.js";
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT | 5001
app.use('/', userRouter)
app.use('/deliveryboy', DeliveryBoysRouter)

async function startServer() {
    try {
        // const connection = await db.connectDB();
        await connectSequelize()
        await sequelizeConfig.sync({ alter: true });
        console.log("sync done ... ")
        await OrderProducts.create({OrderId:2, ProductId:5, quantity:5})
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}
startServer();