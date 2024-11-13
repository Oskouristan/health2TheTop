import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../styles/userpage.scss';

const UserPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null); // Données utilisateur fictives
  const [healthData, setHealthData] = useState(null); // Données de santé fictives
  const [activityData, setActivityData] = useState([]); // Données d'activités fictives

  useEffect(() => {
    // Remplace par une requête réelle à la base de données
    setUserData({
      email: 'user@example.com',
      createdAt: '2023-01-15',
    });

    setHealthData({
      gender: 'M',
      height: 180,
      age: 30,
      weight: 80,
    });

    setActivityData([
      { type: 'Running', duration: 30, calories: 300 },
      { type: 'Cycling', duration: 45, calories: 400 },
    ]);
  }, []);

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

        {/* Section pour les Données Actuelles */}
        <div className="data-section">
          <h2>Données Actuelles</h2>
          <p>Email : {userData?.email}</p>
          <p>Date de création : {userData?.createdAt}</p>
          <p>Genre : {healthData?.gender}</p>
          <p>Taille : {healthData?.height} cm</p>
          <p>Âge : {healthData?.age} ans</p>
          <p>Poids : {healthData?.weight} kg</p>
        </div>

        {/* Section pour les Objectifs */}
        <div className="data-section">
          <h2>Objectifs</h2>
          <p>Poids cible : 75 kg</p>
          <p>Durée d'entraînement hebdomadaire : 5 heures</p>
        </div>

        {/* Section pour le Programme Sportif */}
        <div className="data-section">
          <h2>Programme Sportif</h2>
          {activityData.map((activity, index) => (
            <div key={index}>
              <p>Type : {activity.type}</p>
              <p>Durée : {activity.duration} min</p>
              <p>Calories brûlées : {activity.calories} kcal</p>
            </div>
          ))}
        </div>

        {/* Section pour le Health Score */}
        <div className="data-section">
          <h2>Health Score</h2>
          <p>Score actuel : 85/100</p>
          <p>Basé sur vos données récentes de santé et d'activités.</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
    