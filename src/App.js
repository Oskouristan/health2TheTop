import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/blog/BlogList';
import Article from './components/blog/Article';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';

import './styles/style.scss';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/login" element={<Login />} /> {/* Route de la page de connexion */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
