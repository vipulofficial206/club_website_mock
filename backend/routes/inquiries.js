const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Inquiry = require('../models/Inquiry');

// @route   GET api/inquiries
// @desc    Get all inquiries
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ date: -1 });
        res.json(inquiries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/inquiries
// @desc    Submit inquiry
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        const inquiry = await newInquiry.save();
        res.json(inquiry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;