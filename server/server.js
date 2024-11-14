const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données PostgreSQL');
    }
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'API fonctionne' });
});

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
        console.error('Erreur lors de l\'authentification:', err);
        res.status(500).json({ error: 'Erreur lors de l\'authentification' });
    }
});

app.get('/api/users/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query('SELECT id, email, created_at FROM users WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const user = result.rows[0];
        res.json(user);
    } catch (err) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des données de l\'utilisateur' });
    }
});

app.get('/api/health-data/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query(
            'SELECT gender, height, age, weight, last_modified FROM health_data WHERE user_id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Données de santé non trouvées' });
        }

        const healthData = result.rows[0];
        res.json(healthData);
    } catch (err) {
        console.error('Erreur lors de la récupération des données de santé:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des données de santé' });
    }
});


// Route pour créer un compte temporaire et envoyer un code de vérification
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Génère un code à 6 chiffres
  
    try {
      // Insère l'utilisateur temporairement dans la table et stocke le code
      await pool.query('INSERT INTO temp_users (email, password_hash, verification_code) VALUES ($1, $2, $3)', 
                       [email, password, verificationCode]);
  
      // Envoie le code par email ici (utilise un service comme nodemailer)
      console.log(`Code de vérification pour ${email}: ${verificationCode}`); // Pour tester
  
      res.json({ message: 'Code de vérification envoyé' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la création du compte' });
    }
});
  
// Route pour vérifier le code et activer le compte
app.post('/api/verify-code', async (req, res) => {
    const { code } = req.body;
    try {
      // Vérifie le code dans la table temp_users
      const result = await pool.query('SELECT * FROM temp_users WHERE verification_code = $1', [code]);
      
      if (result.rows.length === 0) {
        return res.json({ success: false });
      }
  
      // Déplace l'utilisateur vérifié dans la table users
      const user = result.rows[0];
      await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2)', [user.email, user.password_hash]);
      await pool.query('DELETE FROM temp_users WHERE verification_code = $1', [code]); // Supprime l'utilisateur temporaire
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la vérification du code' });
    }
});  


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
