import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoie les identifiants au backend pour vérification
      const response = await axios.post('http://localhost:3001/api/login', { email, password });

      // Vérifie si le backend renvoie un userId
      const { userId } = response.data;
      if (userId) {
        navigate(`/user/${userId}`); // Redirige vers UserPage avec l'userId de la BD
      } else {
        alert('Incorrect email or password');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      alert('Erreur lors de la connexion');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>SIGN IN</h2>
        <p>Healthy Solutions for a Healthier World</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
        <p className="register-link">
          Doesn’t have an account? <a href="/signup">sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
