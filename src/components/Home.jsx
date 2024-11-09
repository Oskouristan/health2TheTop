// components/Home.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="main-layout">
        <aside className="sidebar">
          <ul>
            <li><a href="#"><i className="bi bi-house"></i> Home</a></li>
            <li><a href="#"><i className="bi bi-cloud"></i> Cloud</a></li>
            <li><a href="#"><i className="bi bi-stack"></i> Database</a></li>
            <li><a href="#"><i className="bi bi-code-slash"></i> Development</a></li>
            <li><a href="#"><i className="bi bi-people"></i> Community</a></li>
            <li><a href="#"><i className="bi bi-arrow-repeat"></i> Updates</a></li>
            <li><a href="#"><i className="bi bi-plus"></i> More</a></li>
          </ul>
        </aside>
        <main className="content">
          {/* Les cartes de blog seront ajoutées dynamiquement ici */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;