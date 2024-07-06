import bcrypt from "bcrypt";
import DeliveryBoys from "../models/DeliveryBoys.js"; // Adjust the path as necessary
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"
import Orders from "../models/Orders.js";
import { where } from "sequelize";
const RegisterDeliveryBoy = async (req, res) => {
    const { username, email, phoneNo, password } = req.body;
    try {
        if (!username | !email | !password | !phoneNo) {
            return res.status(400).json({ msg: "Please provide all the fileds" })
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
        const deliveryboy = await DeliveryBoys.findOne({ where: { email: email } });
        if (deliveryboy) {
            return res.status(409).json({ msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newboy = await DeliveryBoys.create({
            username: username,
            email: email,
            phoneNo: phoneNo,
            password: hashedPassword
        });
        return res.status(201).json({ msg: "User created successfully", user: newboy });
    } catch (err) {
        console.error("Error in RegisterDeliveryBoy:", err); // Log the error for debugging
        return res.status(500).json({ msg: "Failed to register user" });
    }
};

const LoginDeliveryBoy = async (req, res) => {
    const { email, password } = req.body
    try {
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
        const deliveryboy = await DeliveryBoys.findOne({ where: { email: email } });
        if (deliveryboy == null) {
            return res.status(404).json({ msg: "User doesn't exist" })
        }
        const result = await bcrypt.compare(password, deliveryboy.password)
        if (result) {
            const token = jwt.sign({ userId: deliveryboy.id, userType: 'deliveryboy' }, 'secret_key', {
                expiresIn: '1h'
            });
            return res.status(200).json({ msg: "Login successfullt", Access_token: token })
        } else {
            return res.status(400).json({ msg: "Invalid password" })
        }
    } catch (err) {
        console.error("Error in LoginDeliveryBoy:", err)
        return res.status(500).json({ msg: "Failed to login user" })
    }
}

const myPendingOrders = async (req,res) => {
    try{
        const deliveryboyId = req.deliveryboy.userId
        const allOrders = await Orders.findAll({where : {deliveryBoyId : deliveryboyId}})
        if(allOrders.length > 0){
            return res.status(200).json({ PendingOrders : allOrders})
        }
        return res.status(200).json({ msg: "No orders found" });
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to load orders"})
    }
}

const orderDelivered = async (req,res) => {
    try{
        const deliveryboyId = req.deliveryboy.userId
        const orderId = req.body.orderId
        const order = await Orders.findOne({where : {id : orderId}})
        const deliveryboy = await DeliveryBoys.findOne({where:{id:deliveryboyId}})
        if(order){
            deliveryboy.TodayOrders += 1;
            await deliveryboy.save();
            order.orderStatus = true
            await order.save()
            return res.status(200).json({msg : "Marked"})
        }else{
            return res.status(200).json({msg: "No order found"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to mark as delivered"})
    }
}

const changeStatus = async (req,res) => {
    try{
        const deliveryboyId = req.deliveryboy.userId
        const deliveryboy = await DeliveryBoys.findOne({where:{id:deliveryboyId}})
        deliveryboy.isAvilable = !deliveryboy.isAvilable;
        await deliveryboy.save();
        return res.status(200).json({msg: "Done"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to mark as delivered"})
    }
}


export {
    RegisterDeliveryBoy,
    LoginDeliveryBoy,
    orderDelivered,
    myPendingOrders,
    changeStatus
};
