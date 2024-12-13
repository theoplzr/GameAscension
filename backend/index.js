const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test de route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Route pour récupérer les services
app.get('/api/services', async (req, res) => {
    try {
        console.log('Attempting to fetch services from database...');
        const result = await pool.query('SELECT * FROM services');
        console.log('Fetched services:', result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching services:', err);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
