import express from "express";
import { RegisterUser, 
         LoginUser, 
         OnlyUserAccess,
         getAllHotels,
         getProducts,
         getMyOrders,
         UserLogout,
         bookOrder } from "../controllers/userController.js";
import { userAuth } from "../middleware.js/auth.js"
const userRouter = express.Router()

userRouter.post('/register', RegisterUser)
userRouter.post('/login', LoginUser)
userRouter.get('/logout', userAuth, UserLogout)
userRouter.get('/auth', userAuth, OnlyUserAccess)
userRouter.get('/getallhotels', userAuth ,getAllHotels)
userRouter.get('/getallhotels/:id',userAuth ,getProducts)
userRouter.get('/myorders', userAuth, getMyOrders)
userRouter.post('/book',userAuth,bookOrder)


export default userRouter