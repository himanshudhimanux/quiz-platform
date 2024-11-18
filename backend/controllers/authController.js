
const User = require('../models/UserModel')
const generateToken = require('../config/GenerateToken')

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = generateToken(newUser._id);
        res.json({ token, msg: 'User Created Successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User does not exist' })

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        const token = generateToken(user._id)
        res.json({ token, msg: 'User Logged In Successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

    // Google OAuth 
    const googleAuth = (req, res, next) => {
        passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
    };

    // Google OAuth Callback
    const googleAuthCallback = (req, res, next) => {
        passport.authenticate("google", { failureRedirect: "/login" }, (err, user) => {
            if (err || !user) return res.redirect("/login");

            // Create JWT Token
            const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "1h" });
            res.redirect(`/dashboard?token=${token}`);
        })(req, res, next);
    };

module.exports = { registerUser, loginUser, googleAuth, googleAuthCallback }
