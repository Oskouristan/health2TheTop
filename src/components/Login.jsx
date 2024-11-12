import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const verify = () => {
    // Logique de vérification simplifiée : retourne true pour l'instant
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verify()) {
      navigate('/user'); // Redirige vers la page UserPage si la vérification est réussie
    } else {
      alert('Incorrect email or password'); // Alerte en cas d'échec
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
