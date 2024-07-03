import jwt from "jsonwebtoken"

const userAuth = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            res.status(400).json({msg : "please provide token"})
        }
        try{
            const decoded = jwt.verify(token, 'secret_key');
            req.user = decoded
            if (req.user.userType === 'deliveryboy') {
                console.log("incal")
                return res.status(401).json({ error: "Unauthorized access" });
            }
            next()
        }catch(error){
            res.status(400).json({msg : "Invalid token"})
        }
    } catch (err) {
        console.log(err)
    }
}

export {
    userAuth
}