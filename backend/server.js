const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dragonfist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/members', require('./routes/members'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/reviews', require('./routes/reviews'));

// Health Check
app.get('/', (req, res) => res.send('Dragon Fist API Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));