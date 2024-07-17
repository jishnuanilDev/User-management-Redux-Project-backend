
const jwt = require('jsonwebtoken')
const User = require('../Models/UserSchema')
const crypto = require('crypto')

const SECRET_KEY = 'jisd3v'

const userTokenVerify = async (req, res, next) => {
    const token = req.headers.authorization;


    if (!token) {
        return res.status(401).json({ info: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token,SECRET_KEY);
        const userId = decoded.userId
        const user = await User.findById(userId)
        if(!user){
            return res.status(401).json({error:"Invalid token"})
        }

        req.user = user
        next();
    } catch (error) {
        console.error('Error verifying user token:', error);
        return res.status(401).json({ info: 'Invalid authorization token' });
    }
};



const adminTokenVerify = (req, res, next) => {
    try {
        const token = req.headers.authorization;
 
        if (!token) {
            return res.status(401).json({ info: 'Authorization token is missing' });
        }
        const decoded = jwt.verify(token,SECRET_KEY);
        req.admin = decoded.email;
        next();
    } catch (error) {
        console.error('Error verifying admin token:', error);
        return res.status(401).json({ info: 'Invalid authorization token' });
    }
}


module.exports = {
    userTokenVerify,
    adminTokenVerify,
}