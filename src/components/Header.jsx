import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <header className="health-tracker-header d-flex align-items-center px-4" style={{ width: '100%' }}>
      <div className="header-logo d-flex align-items-center justify-content-start" style={{ flex: 1 }}>
        <a href="/">
          <img src={logo} alt="Logo NutriStark" style={{ height: '60px' }} />
        </a>
      </div>
      <div className="header-search mx-3 d-flex justify-content-center" style={{ flex: 1 }}>
        <input type="text" className="form-control" placeholder="Search resources" style={{ width: '100%' }} />
      </div>
      <div className="header-icons d-flex justify-content-end" style={{ flex: 1 }}>
        <i className="bi bi-bar-chart-line mx-3"></i>
        <i className="bi bi-chat-dots mx-3"></i>
        <Link to="/login">
          <i className="bi bi-person-circle mx-3"></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
