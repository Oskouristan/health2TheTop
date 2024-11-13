import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import BlogList from './components/blog/BlogList';
import Article from './components/blog/Article';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import UserPage from './components/UserPage';
import Store from './components/store/Store';
import './styles/style.scss';

const MainApp = () => {
  const location = useLocation();
  const isUserPage = location.pathname === '/user';

  return (
    <>
      {!isUserPage && <Header />}
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/store" element={<Store />} />
      </Routes>
      {!isUserPage && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <MainApp />
  </Router>
);

export default App;
