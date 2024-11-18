const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema  = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    googleId:{
        type: String,
        unique: true
    },
    role: { type: String, enum: ["student", "teacher"], default: "student" },

},
{
    timestamps: true
}

);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);