import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.scss';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/verify-code', { code });
      if (response.data.success) {
        alert('Compte créé avec succès');
        navigate('/login'); // Redirige vers la page de connexion après la vérification
      } else {
        alert('Code de vérification incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du code :', error);
      alert('Erreur lors de la vérification du code');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Enter Verification Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="form-control"
              maxLength="6"
            />
          </div>
          <button type="submit" className="btn-primary">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
