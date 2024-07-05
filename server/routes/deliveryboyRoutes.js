import express from "express";
import { RegisterDeliveryBoy, LoginDeliveryBoy, orderDelivered, myPendingOrders } from "../controllers/deliveryboyController.js";
import { deliveryboyAuth } from "../middleware.js/auth.js";
const DeliveryBoysRouter = express.Router()

DeliveryBoysRouter.post('/register', RegisterDeliveryBoy)
DeliveryBoysRouter.post('/login', LoginDeliveryBoy)
DeliveryBoysRouter.post('/orderdelivered',deliveryboyAuth,orderDelivered)
DeliveryBoysRouter.get('/pendingorders', deliveryboyAuth , myPendingOrders)

export default DeliveryBoysRouter