// src/components/blog/Article.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import articles from '../../data/articles.json';

const Article = () => {
  const { slug } = useParams();
  const article = articles.find(item => item.slug === slug);

  if (!article) {
    return <div>Article non trouvé</div>;
  }

  return (
    <div className="container my-4">
      <h1>{article.titre}</h1>
      <p><strong>Auteur :</strong> {article.auteur}</p>
      <p><strong>Publié le :</strong> {article.date}</p>
      <p><strong>Temps de lecture :</strong> {article.temps_de_lecture}</p>
      <img src={article.image_url} alt={article.titre} className="img-fluid my-4" />
      <p>{article.texte}</p>
    </div>
  );
};

export default Article;
