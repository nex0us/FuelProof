import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Enable CORS for React frontend
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database('backend/fuel_economy.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Route to fetch data
app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM FEG2021 LIMIT 10;';
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.json(rows);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});