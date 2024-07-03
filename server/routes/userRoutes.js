import express from "express";
import { RegisterUser, LoginUser, OnlyUserAccess } from "../controllers/userController.js";
import { userAuth } from "../middleware.js/auth.js";
const userRouter = express.Router()

userRouter.post('/register', RegisterUser)
userRouter.post('/login', LoginUser)
userRouter.get('/auth', userAuth, OnlyUserAccess)


export default userRouter