const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Import Nodemailer

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

// Configuration du transporteur d’e-mails Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Utilisez true pour le port 465, sinon false pour les autres ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Route de test pour vérifier si l'API fonctionne
app.get('/api/test', (req, res) => {
    res.json({ message: 'API fonctionne' });
});

// Route de connexion (authentification de l'utilisateur)
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

// Route pour récupérer les informations d'un utilisateur par son ID
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

// Route pour récupérer les données de santé d'un utilisateur par son ID
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
  
      // Envoie le code par e-mail
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Code de vérification de votre compte',
        text: `Votre code de vérification est : ${verificationCode}`,
      };
  
      await transporter.sendMail(mailOptions);
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

// Route de test pour envoyer un e-mail
app.get('/api/test-email', async (req, res) => {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Adresse e-mail de l'expéditeur
      to: 'mdohdv@gmail.com', // Remplacez par l'adresse e-mail de destination
      subject: 'Test d\'envoi d\'e-mail avec Nodemailer',
      text: 'Bonjour ! Ceci est un e-mail de test envoyé depuis le serveur Node.js avec Nodemailer.',
    };
  
    try {
      // Envoie de l'e-mail
      await transporter.sendMail(mailOptions);
      res.json({ message: 'E-mail envoyé avec succès !' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
