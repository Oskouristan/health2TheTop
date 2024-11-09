import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/blog/BlogList';
import Article from './components/blog/Article';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/style.scss';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/article/:slug" element={<Article />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
