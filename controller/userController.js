const User = require("../module/userModel")
const bcrypt = require("bcryptjs");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const validator = require('validator');


//add user controller
exports.addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if(name =="" || email =="" || password == ""){
            return res.status(400).json({ msg: 'All fields are requires!' });
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({ msg: 'Email is not valid!' });
        }
        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(200).json({ msg: 'User already exists' });
        }

        //add user object
        user = new User({
            name,
            email,
            password
        });

        //save user in mongoDB
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// login controller 
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if(!validator.isEmail(email)){
            return res.status(400).json({ msg: 'Email is not valid!' });
        }
        // Check if the user exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
       const token = jwt.sign({userId:user._id, name: user.name}, process.env.JWT_SECRET, {
            expiresIn: "86400s",
          });

        // Find the user by ID and update token
        const updatedUser = await User.findByIdAndUpdate({_id : user._id}, { token }, { new: true });


        res.json({ msg: 'Login successful', token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.logout = async(req, res) => {
    const token = req.token;
    const user = await User.findOne({ token });
    if(!user) {
        res.status(400).send({ message: "user logout" })
    } else {
        const updatedUser = await User.findByIdAndUpdate({_id : user._id}, { token : "" }, { new: true });
        res.status(400).send({ message: "User logout" })
    }
}