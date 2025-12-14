const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['Workshop', 'Tournament', 'Social', 'Training'],
        default: 'Workshop'
    },
    isUpcoming: { type: Boolean, default: true }
});

module.exports = mongoose.model('Event', EventSchema);