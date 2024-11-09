import React from 'react';
import logo from '../assets/images/logo.png'; // Import du logo

const Header = () => {
  return (
    <header className="health-tracker-header d-flex align-items-center px-4" style={{ width: '100%' }}>
      <div className="header-logo d-flex align-items-center justify-content-start" style={{ flex: 1 }}>
        <a href="/">
          <img
            src={logo} // Utilisation de la variable importée pour l'image
            alt="Logo NutriStark"
            style={{ height: '60px' }}
          />
        </a>
      </div>
      <div className="header-search mx-3 d-flex justify-content-center" style={{ flex: 1 }}>
        <input type="text" className="form-control" placeholder="Search resources" style={{ width: '100%' }} />
      </div>
      <div className="header-icons d-flex justify-content-end" style={{ flex: 1 }}>
        <i className="bi bi-bell"></i>
        <i className="bi bi-envelope mx-3"></i>
        <i className="bi bi-person"></i>
      </div>
    </header>
  );
};

export default Header;
