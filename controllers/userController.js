const userModel = require("../models/user");
const { hashPassword, comparePassword, generateToken } = require("../helpers/userHelper");

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name.length < 3 || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || password.length < 3) {
            return res.status(400).send({ success: false, message: 'Some fields are invalid' });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({ success: false, message: 'This email is already registered' });
        }
        const hashedPassword = await hashPassword(password);
        const user = new userModel({ name, email, password: hashedPassword })
        await user.save();
        res.status(201).send({ success: true, message: "User created successfully", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || password.length < 3) {
            return res.status(400).send({ success: false, message: 'email or password is invalid' })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'Invalid username or password' });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({ success: false, message: 'Invalid username or password' });
        }
        const token = await generateToken(user._id);
        res.status(201).send({ success: true, message: 'User logined', token })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}

const getUserInfoController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        user.password=undefined;
        res.status(200).send({ success: true, user: user });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Internal server erorr" })
    }
}

module.exports = {
    registerController,
    loginController,
    getUserInfoController,
}