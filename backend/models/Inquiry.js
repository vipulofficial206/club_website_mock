const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['General', 'Join'], default: 'General' },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['New', 'Read'], default: 'New' }
});

module.exports = mongoose.model('Inquiry', InquirySchema);