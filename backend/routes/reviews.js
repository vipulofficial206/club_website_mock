const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const newReview = new Review(req.body);
        const review = await newReview.save();
        res.json(review);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Review.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Review removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;