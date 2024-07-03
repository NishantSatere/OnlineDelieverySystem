import express from "express";
import { RegisterDeliveryBoy, LoginDeliveryBoy } from "../controllers/deliveryboyController.js";

const DeliveryBoysRouter = express.Router()

DeliveryBoysRouter.post('/register', RegisterDeliveryBoy)
DeliveryBoysRouter.post('/login', LoginDeliveryBoy)

export default DeliveryBoysRouter