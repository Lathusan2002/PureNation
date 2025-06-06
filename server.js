const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const registerRoute = require('./routes/register');
const sponsorRoute = require('./routes/sponsor');



const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));
//Routes
app.use('/api/contact', require('./routes/contact'));
// Routes
app.use('/api/register', registerRoute);
// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
// Routes
app.use('/api/sponsor', sponsorRoute);
app.use('/api/events', require('./routes/event'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
