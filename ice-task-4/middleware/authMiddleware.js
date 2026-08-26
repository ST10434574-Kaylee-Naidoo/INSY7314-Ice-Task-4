const jwt = require('jsonwebtoken'); 
const User = require('../models/User');


const protect = (req, res, next) => { 

    try
    {
        const authHeader = req.headers.authorization; 

        if (!authHeader || !authHeader.startsWith('Bearer ')) 
        { 
        return res.status(401).json({ error: 'No token provided' }); 
        } 

        const token = authHeader.split(' ')[1]; 

        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        if(!user)
        {
            return res.status(401).json({error:'user not found'});
        }

        req.user=
        {
            id: user._id,
            role:user.role
        };

        next();
    }
    catch(error)
    {
        return res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Access denied'
            });
        }

        next();
    };
};

module.exports = {
    protect,
    authorizeRoles
};



