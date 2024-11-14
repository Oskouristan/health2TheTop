// server.js
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(cors()); // Autoriser les requêtes cross-origin
app.use(express.json()); // Permettre le traitement des requêtes JSON

// Configurer la connexion PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Route pour récupérer les données de santé d'un utilisateur
app.get('/api/health-data/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM health_data WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

// Route pour ajouter des données de santé
app.post('/api/health-data', async (req, res) => {
    const { user_id, gender, height, age, weight } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO health_data (user_id, gender, height, age, weight) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, gender, height, age, weight]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l\'insertion des données' });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
