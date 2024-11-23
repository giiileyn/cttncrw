const jwt = require("jsonwebtoken");
const User = require("../models/"); // Adjust path to your User model

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies; // Or req.headers['authorization'], depending on your setup

        if (!token) {
            return res.status(401).json({ message: "Please login to access this resource" });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);

        // Add debugging to confirm user data is attached
        console.log("Authenticated User:", req.user);

        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(500).json({ message: "Authentication failed" });
    }
};


exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {
        // console.log(roles, req.user, req.body);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role (${req.user.role}) is not allowed to acccess this resource` })

        }
        next()
    }
}