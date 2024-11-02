const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path as necessary
const router = express.Router(); // This line initializes the router

// Register Route
// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error.message); // Log the specific error message
        res.status(500).json({ error: 'Internal Server Error', details: error.message }); // Return details
    }
});


module.exports = router;
