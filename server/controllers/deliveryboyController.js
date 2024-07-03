import bcrypt from "bcrypt";
import DeliveryBoys from "../models/DeliveryBoys.js"; // Adjust the path as necessary
import jwt from "jsonwebtoken"
const RegisterDeliveryBoy = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username | !email | !password) {
            return res.status(400).json({ msg: "Please provide all the fileds" })
        }
        const deliveryboy = await DeliveryBoys.findOne({ where: { email: email } });
        if (deliveryboy) {
            return res.status(409).json({ msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newboy = await DeliveryBoys.create({
            username: username,
            email: email,
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

export {
    RegisterDeliveryBoy,
    LoginDeliveryBoy
};
