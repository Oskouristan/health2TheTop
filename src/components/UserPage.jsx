import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.png';
import '../styles/userpage.scss';

const UserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL

  const [userData, setUserData] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer les données utilisateur
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3001/api/users/${userId}`);
        setUserData(userResponse.data);

        const healthResponse = await axios.get(`http://localhost:3001/api/health-data/${userId}`);
        setHealthData(healthResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, [userId]);

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

        <div className="data-section">
          <h2>Données Actuelles</h2>
          <p>Email : {userData?.email}</p>
          <p>Date de création : {userData?.createdAt}</p>
          <p>Genre : {healthData?.gender}</p>
          <p>Taille : {healthData?.height} cm</p>
          <p>Âge : {healthData?.age} ans</p>
          <p>Poids : {healthData?.weight} kg</p>
        </div>

        <div className="data-section">
          <h2>Objectifs</h2>
          <p>Poids cible : 75 kg</p>
          <p>Durée d'entraînement hebdomadaire : 5 heures</p>
        </div>

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
