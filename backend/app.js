const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use('/api/v1', userRoutes);

// Define your Mongoose model outside of the route handler
const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));

// Route for testing
app.post('/test', async (req, res) => {
    const testData = new TestModel({ name: 'Test Document' });
    try {
        await testData.save();
        res.json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert data' });
    }
});

module.exports = app;
