const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Configure CORS pour autoriser les requêtes provenant de http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // Autorise les requêtes depuis localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    credentials: true // Permet l'envoi de cookies et des informations d'authentification
}));

app.use(express.json()); // Permet de traiter les requêtes JSON

// Connexion à la base de données PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Route de test
app.get('/api/test', (req, res) => {
    res.json({ message: 'API fonctionne' });
});

// Route de connexion
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT id, password_hash FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }

        const user = result.rows[0];
        const isPasswordValid = (password === user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        res.json({ userId: user.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l\'authentification' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
