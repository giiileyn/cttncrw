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
};
