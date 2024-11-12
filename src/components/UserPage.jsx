import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../styles/userpage.scss';

const UserPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="user-page">
      <div className="profile-header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="categories">
          <span>Santé</span>
          <span>Longévité</span>
          <span>Conseils Fitness</span>
          <span>Nutrition</span>
          <span>Bien-être</span>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
      </div>

      <div className="profile-content">
        <h1>Bienvenue sur votre tableau de bord santé</h1>
        <p>Explorez vos statistiques et conseils personnalisés ici.</p>
      </div>
    </div>
  );
};

export default UserPage;
