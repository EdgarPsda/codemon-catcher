const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Removing some data from request for security.
            req.user = await User.findById(decoded.id).select("-password -confirm -token -createdAt -updatedAt -__v");

            return next();
        } catch (error) {
            return res.status(404).json({ msg: "Authentication failed." });
        }
    }

    if (!token) {
        const error = new Error('Token not valid or not found');
        res.status(401).json({ msg: error.message });
    }
    next();
}

module.exports = checkAuth;