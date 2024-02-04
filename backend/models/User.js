const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String
    },
    confirm: {
        type: Boolean,
        default: false
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon'
    }]
}, {
    timestamps: true

});


// Hashing password using Bcrypt
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.validatePassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm, this.password)
}

const User = mongoose.model("User", userSchema);
module.exports = User;