import bcrypt from "bcrypt";
import Users from "../models/Users.js"
import jwt from "jsonwebtoken"
import {body , validationResult} from "express-validator"
import Hotels from "../models/Hotels.js"
import Products from "../models/Products.js"
import Orders from "../models/Orders.js"
import { where } from "sequelize";
import DeliveryBoys from "../models/DeliveryBoys.js";
import OrderProducts from "../models/OrderProducts.js";
const RegisterUser = async (req,res) => {
    const { username, email, phoneNo, password } = req.body;
    try {
        if (!username || !email || !password || !phoneNo) {
            return res.status(400).json({ msg: "Please provide all the fields" });
        }
        await body('phoneNo').isMobilePhone().run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: "Please provide valid phone number!" });
        }
        await body('email').isEmail().custom(value => value.endsWith('@gmail.com')).run(req);
        const gmailError = validationResult(req);
        if (!gmailError.isEmpty()) {
            return res.status(400).json({ msg: "Please provide valid gamil address!" });
        }
        await body('password').isStrongPassword().run(req);
        const passwordError = validationResult(req);
        if (!passwordError.isEmpty()) {
            return res.status(400).json({ msg: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character" });
        }
        const user = await Users.findOne({ where: { email: email } });
        if (user) {
            return res.status(409).json({ msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            username: username,
            email: email,
            phoneNo: phoneNo,
            password: hashedPassword
        });
        return res.status(201).json({ msg: "User created successfully", user: newUser });
    }catch(err){
        console.log(err)
        return res.status(500).json({msg : "Failed to register user"})
    }
}

const LoginUser = async (req, res) => {
    const {email , password} = req.body
    try{
        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide all the fields" });
        }
        await body('email').isEmail().custom(value => value.endsWith('@gmail.com')).run(req);
        const gmailError = validationResult(req);
        if (!gmailError.isEmpty()) {
            return res.status(400).json({ msg: "Please provide valid gamil address!" });
        }
        await body('password').isStrongPassword().run(req);
        const passwordError = validationResult(req);
        if (!passwordError.isEmpty()) {
            return res.status(400).json({ msg: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character" });
        }
        const user = await Users.findOne({ where: { email: email } });
        if(user == null){
            return res.status(404).json({ msg: "User doesn't exist" })
        }
        const result = await bcrypt.compare(password , user.password)
        if(result){
            const token = jwt.sign({ userId: user.id, userType: 'user' }, 'secret_key', {
                expiresIn: '1h'
            });
            return res.status(200).json({ msg: "Login successfullt",user:user, token: token })
        }else{
            return res.status(400).json({ msg: "Invalid password" })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Failed to login user" })
    }
}

const getAllHotels = async (req,res) => {
    try{
        const allHotels = await Hotels.findAll()
        if (allHotels.length > 0) {
            return res.status(200).json({ hotels: allHotels });
        }
        return res.status(200).json({ msg: "No hotels found" });
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "failed to load hotels"})
    }
}

const getProducts = async (req,res) => {
    try{
        const hotelId = req.params.id; 
        const allProducts = await Products.findAll({where : {HotelId : hotelId}})
        if(allProducts.length > 0){
            return res.status(200).json({ Products : allProducts})
        }
        return res.status(200).json({ msg: "No products found" });
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "failed to load products"})
    }
}

const getMyOrders = async (req, res) => {
    try{
        const userId = req.user.userId
        const myOrders = await Orders.findAll({where : { userId : userId}})
        let allOrderDetails = []
        for(const order of myOrders){
            const orderId = order.id
            const orderAmount = order.orderAmount
            let singleOrderProducts = []
            const orderProducts = await OrderProducts.findAll({where: {OrderId : orderId}}) 
            for(const orderProducst of orderProducts){
                const ProductId = orderProducst.ProductId
                const product = await Products.findOne({where: {id : ProductId}})
                if(product){
                    singleOrderProducts.push(product)
                }
            }
            allOrderDetails.push({
                orderId: orderId,
                orderAmount: orderAmount,
                products: singleOrderProducts
            });
        }
        if(myOrders.length > 0){
            return res.status(200).json({ Orders : allOrderDetails})
        }
        return res.status(200).json({ msg: "No orders found" });
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "failed to load my orders"})
    }
}

const bookOrder = async (req,res) => {
    try{
        const ordersData = req.body.ordersData
        if(!ordersData || !Array.isArray(ordersData) || ordersData.length === 0){
            return res.status(400).json({msg : "Invalid request format or empty orders array"})
        }
        const userId = req.user.userId
        const deliveryboy = await DeliveryBoys.findOne({where : {isAvilable : true}})
        if (!deliveryboy) {
            return res.status(404).json({ msg: "No available delivery boys" });
        }
        deliveryboy.isAvilable = false
        await deliveryboy.save()
        const OrderDone = await Orders.create({userId : userId, deliveryBoyId : deliveryboy.id, orderDetails : "not provided"})
        const createdOrders = []
        let orderAmount = 0
        for(const orderData of  ordersData){
            const {productId , quantity} = orderData
            const ProductsDetials = await Products.findOne({where :{id : productId}})
            if (!ProductsDetials) {
                console.log(`Product with ID ${ProductsDetials.id} not found`);
                continue; 
            }
            orderAmount += ProductsDetials.priceOfProduct * quantity
            console.log(orderAmount)
            const HotelId = ProductsDetials.HotelId
            const Hotel = await Hotels.findOne({where : {id : HotelId}})
            const HotelName = Hotel.HotelName
            if (!HotelName) {
                console.log(`Hotel with ID ${Hotel.id} not found`);
                continue; 
            }else{
                console.log(HotelName, `Prepare ${quantity}`)
            }
            const createdEntry = await OrderProducts.create({OrderId : OrderDone.id, ProductId :productId, quantity : quantity })
            createdOrders.push(createdEntry)
        }
        OrderDone.orderAmount = orderAmount
        await OrderDone.save()
        return res.status(200).json({orderAmount : OrderDone.orderAmount, orderDetails: OrderDone, extraInfo: createdOrders });
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "failed to book order"})
    }
}

const UserLogout = async (req, res) => {
    try {
        return res.status(200).json({ msg: "User logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to logout user" });
    }
}

const OnlyUserAccess = async (req, res) => {
    console.log("authorized")
    return res.send("access")
}

export {
    RegisterUser,
    LoginUser,
    getAllHotels,
    getProducts,
    getMyOrders,
    bookOrder,
    OnlyUserAccess,
    UserLogout
}