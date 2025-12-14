const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Member = require('../models/Member');

// @route   GET api/members
// @desc    Get all members
// @access  Public
router.get('/', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/members
// @desc    Add new member
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newMember = new Member(req.body);
        const member = await newMember.save();
        res.json(member);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/members/:id
// @desc    Delete member
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        await Member.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Member removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;