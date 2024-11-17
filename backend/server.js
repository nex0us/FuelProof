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

app.get('/api/avg_mpg_comb', (req, res) => {
    const query = `
        SELECT AVG("MPG Comb") AS "Avg MPG Comb", Year
        FROM (
            SELECT * FROM FEG2021
            UNION ALL
            SELECT * FROM FEG2022
            UNION ALL
            SELECT * FROM FEG2023
            UNION ALL
            SELECT * FROM FEG2024
        ) AS CombinedTables
        WHERE Manufacturer = 'TOYOTA'
        GROUP BY Year;
        `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.json(rows);
        }
    });
});

app.get('/api/mpg_comb', (req, res) => {
    const query = `
        SELECT "MPG Comb", Model, Year
        FROM (
            SELECT * FROM FEG2021
            UNION ALL
            SELECT * FROM FEG2022
            UNION ALL
            SELECT * FROM FEG2023
            UNION ALL
            SELECT * FROM FEG2024
        ) AS CombinedTables
        WHERE Manufacturer = 'TOYOTA';
        `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.json(rows);
        }
    });
});

app.get('/api/toyota_avg_mpg', (req, res) => {
    const query = `
        SELECT AVG("MPG Comb") as "AVG MPG Comb"
        FROM (
            SELECT * FROM FEG2021
            UNION ALL
            SELECT * FROM FEG2022
            UNION ALL
            SELECT * FROM FEG2023
            UNION ALL
            SELECT * FROM FEG2024
        ) AS CombinedTables
        WHERE Manufacturer = 'TOYOTA';
        `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.json(rows);
        }
    });
});

app.get('/api/comp_avg_mpg', (req, res) => {
    const query = `
        SELECT AVG("MPG Comb") as "Comp AVG"
        FROM (
            SELECT * FROM FEG2021
            UNION ALL
            SELECT * FROM FEG2022
            UNION ALL
            SELECT * FROM FEG2023
            UNION ALL
            SELECT * FROM FEG2024
        ) AS CombinedTables
        WHERE Manufacturer != 'TOYOTA';
        `;
    
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