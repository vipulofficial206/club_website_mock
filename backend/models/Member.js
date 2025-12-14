const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    joinYear: { type: String, required: true }
});

module.exports = mongoose.model('Member', MemberSchema);