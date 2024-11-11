const User = require('../models/user');
const cloudinary = require('cloudinary').v2;

exports.registerUser = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an avatar image.' });
        }

        // Uploading avatar to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        });

         
        const { name, email, password } = req.body;

        // Create a new user
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
            },
        });

        const token = user.getJwtToken();

        return res.status(201).json({
            success: true,
            user,
            token
        });

    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter your email and password!' });
    }

    try {
        // Find user with email and include password
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Your email or password is invalid' });
        }

        // Compare passwords
        const isPassMatched = await user.comparePassword(password);
        if (!isPassMatched) {
            return res.status(401).json({ message: 'Your email or password is invalid' });
        }

        // Generate token
        const token = user.getJwtToken();

        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

