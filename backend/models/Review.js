const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    author: { type: String, required: true },
    role: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
});

module.exports = mongoose.model('Review', ReviewSchema);