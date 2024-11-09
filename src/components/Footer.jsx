// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container text-center footer-container">
        <div className="footer-icons mb-3 d-flex justify-content-center align-items-center">
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2" aria-label="YouTube">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2" aria-label="Facebook">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2" aria-label="Twitter">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2" aria-label="Instagram">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2" aria-label="GitHub">
            <i className="fab fa-github fa-2x"></i>
          </a>
        </div>
        <div className="footer-links d-flex justify-content-center mb-4">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/news">News</a>
          <a href="/team">Our Team</a>
        </div>
        <div className="footer-text mt-auto">
          <p>&copy; 2024 DariusWebServices Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
