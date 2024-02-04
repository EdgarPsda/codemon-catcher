const User = require("../models/User");
const generateId = require("../helpers/generateId");
const generateJWT = require("../helpers/generateJWT");

const users = (req, res) => {
    res.json({ msg: "Desde API/USERS" });
};

const createUser = async (req, res) => {

    // Duplicated users
    const { email } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
        const error = new Error("User already created.");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        const userStored = await user.save();
        res.json(userStored);

    } catch (error) {
        console.log(error);
    }
};

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    // Validate if user exists
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("User not found.");
        return res.status(404).json({ msg: error.message });
    }

    // Validate if user is confirmed
    if (!user.confirm) {
        const error = new Error("Account not confirmed.");
        return res.status(403).json({ msg: error.message });
    }

    // Validate user's password
    if (await user.validatePassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        });
    } else {
        const error = new Error("Password incorrect.");
        return res.status(403).json({ msg: error.message });
    }

}

const confirm = async (req, res) => {
    const { token } = req.params;
    const userConfirm = await User.findOne({ token });

    if (!userConfirm) {
        const error = new Error("Invalid Token.");
        return res.status(403).json({ msg: error.message });
    }

    try {
        userConfirm.confirm = true;
        userConfirm.token = "";
        await userConfirm.save();

        res.json({ msg: 'User Confirmed.' });


    } catch (error) {

    }

}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("User not found");
        return res.status(404).json({ msg: error.message });
    }

    try {
        user.token = generateId();
        await user.save();
        res.json({ msg: "Email with instructions has been sent." });
        console.log(user);

    } catch (error) {
        console.log(error);
    }

};

const validateToken = async (req, res) => {
    const { token } = req.params;

    const validToken = await User.findOne({ token });

    if (validToken) {
        res.json({ msg: "Valid Token and User exists" });
    } else {
        const error = new Error("Invalid Token");
        return res.status(404).json({ msg: error.message });
    }
};

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ token });

    if (user) {
        user.password = password;
        user.token = "";

        try {
            await user.save();
            res.json({ msg: "Password modified correctly." });

        } catch (error) {
            console.log(error);
        }

    } else {
        const error = new Error("Invalid Token");
        return res.status(404).json({ msg: error.message });
    }
}

const profile = async (req, res) => {
    const { user } = req;
    res.json(user);
}


module.exports = {
    users,
    createUser,
    authenticate,
    confirm,
    forgotPassword,
    validateToken,
    newPassword,
    profile
}