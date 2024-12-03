const { error } = require('console');
const User = require('../models/user');
const crypto = require('crypto')
const cloudinary = require('cloudinary').v2;
const sendtoEmail = require('../utils/sendtoEmail')
const jwt = require('jsonwebtoken');

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
            token,
            user: {
                role: user.role, // include role in response
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.forgotPass = async (req, res, next) => {
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return re.status(404).json({error: 'No user fount with this email.'})
    }

    //get rst token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    //create rest pass url
    const resetUrl = '${req.protocol}://localhost:3000/password/reset/${resetToken}';
    const message = 'Your passworrd reset token is as follow: \n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.'
    try {
        await sendtoEmail({
            email:user.email,
            subject: 'CottonCrew Password recovery',
            message
        })
        res.status(200).json({
            success:true,
            message: 'Email sent to: ${user.email}'
        })
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return res.status(500).json({ error: error.message })
        // return next(new ErrorHandler(error.message, 500))
    }
}

exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id); // Assuming user ID is available in req.user from JWT
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar, // Assuming avatar is an object with URL in your database
        },
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is retrieved from a JWT or session
        const { name, email, avatar } = req.body;

        // Prepare updated data
        const updatedData = {};
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;

        // If avatar is updated, upload to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'avatars',
                width: 150,
                crop: "scale"
            });

            updatedData.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        // Find and update user
        const user = await User.findByIdAndUpdate(userId, updatedData, {
            new: true, // Return the updated document
            runValidators: true
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        console.error("Error during user update:", error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};




exports.resetPassword = async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has been expired' })
        // return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Password does not match' })
      
    }
    // Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    const token = user.getJwtToken();
    return res.status(201).json({
        success: true,
        token,
        user
    });
}