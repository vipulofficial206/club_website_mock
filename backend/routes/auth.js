const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { password } = req.body;

    // NOTE: In a real app, you would check username AND password.
    // For this specific project requirement (simpler login), we check a hardcoded password check
    // or database check. Here is the proper DB implementation:
    
    // const { username, password } = req.body;
    
    try {
        // For demonstration, we assume a single admin user or check against a master password
        // Real implementation:
        // let user = await User.findOne({ username });
        // if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
        // const isMatch = await bcrypt.compare(password, user.password);
        
        // Simulating the check requested in prompt "dragonfist"
        if (password !== 'dragonfist') {
             return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: 'admin_id', // Mock ID
                role: 'admin'
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { username: 'admin', role: 'admin' } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;