// src/components/blog/BlogList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import articlesData from '../../data/articles.json';
import '../../styles/style.scss'; // Assure que les styles sont appliqués

const BlogList = () => {
  const [articles, setArticles] = useState([]);
  let remainingSpace = 3; // Initialise l'espace restant pour chaque ligne

  // Fonction pour mélanger les articles
  const shuffleArticles = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Mélange les articles au montage du composant
    const shuffledArticles = shuffleArticles([...articlesData]);
    setArticles(shuffledArticles);
  }, []);

  return (
    <div className="container my-4">
      <h2>Nos Articles</h2>
      <div className="content">
        {articles.map((article, index) => {
          let isDoubleWidth = false;

          // Condition pour prendre 2 places (20% de chance) si suffisamment de place dans la ligne
          if (remainingSpace >= 2 && Math.random() < 0.2) {
            isDoubleWidth = true;
            remainingSpace -= 2; // Si l'article prend 2 places, on diminue l'espace restant de 2
          } else {
            remainingSpace -= 1; // Sinon, l'article prend 1 place et on diminue de 1
          }

          // Attribue la classe CSS en fonction de la largeur
          const cardClass = isDoubleWidth ? 'blog-card double-width' : 'blog-card';

          // Réinitialise `remainingSpace` à 3 à la fin de chaque ligne
          if (remainingSpace === 0) {
            remainingSpace = 3;
          }

          return (
            <div
              key={article.id}
              className={cardClass}
              style={{
                backgroundImage: isDoubleWidth ? `url(${article.image_url})` : 'none',
                backgroundSize: 'cover',
                color: isDoubleWidth ? 'white' : 'inherit'
              }}
            >
              <div className="blog-info">
                <h3 className="blog-title">{article.titre}</h3>
                <p className="blog-text">{article.texte}</p>
                <Link to={`/article/${article.slug}`}>
                  <button className="read-more-button">Lire Plus</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
