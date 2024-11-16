
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
const generateToken = require('../config/GenerateToken')

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({ name, email, password: await bcrypt.hash(password, 10) });
        await newUser.save();

        const token = generateToken(newUser._id);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({msg: 'User does not exist'})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

        const token = generateToken(user._id)
        res.json({ token, msg: 'User Logged In Successfully'});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

module.exports = {registerUser, loginUser}
