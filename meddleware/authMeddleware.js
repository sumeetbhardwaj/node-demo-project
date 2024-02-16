const jwt = require('jsonwebtoken');
const User = require("../module/userModel")

exports.isAuth = async (req, res, next) => {
        const { authorization } = req.headers || {}
        
        if(authorization == undefined) {
            res.status(400).send({ message: "Please use token" })
        } else {
            const bearer = authorization.split(' ');
            const token = bearer[1];

        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
            if (err) {
                const user = await User.findOne({ token });

                    if(!user) {
                        res.status(400).send({ message: err.message })
                    } else {
                        const updatedUser = await User.findByIdAndUpdate({_id : user._id}, { token : "" }, { new: true });
                        res.status(400).send({ message: "User logout" })
                    }
            } else {
                
                 const user = await User.findOne({ token });
                 if(!user){
                    res.status(400).send({ message: "User logout" })
                 } else {
                    req.userId = decoded.userId;
                    req.token = token;
                    next()
                 }
            }
        })
    }
};


