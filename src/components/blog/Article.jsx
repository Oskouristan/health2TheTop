// src/components/blog/Article.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import articles from '../../data/articles.json';
import '../../styles/style.scss';

const Article = () => {
  const { slug } = useParams();
  const article = articles.find(item => item.slug === slug);

  if (!article) {
    return <div className="alert alert-warning text-center mt-5">Article non trouvé.</div>;
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div id="article-container" className="col-md-7 p-4"> {/* Width reduced to col-md-6 */}
          <h1 className="fw-bold text-center mb-3">{article.titre}</h1>
          
          <p className="fst-italic mb-4">{article.resume}</p>
          
          <img src={article.image_url} alt={article.titre} className="img-fluid rounded mb-4" />
          
          <p className="lead">{article.texte}</p>
          
          <p className="text-end mt-5">
            <span className="fw-bold">Auteur</span> : {article.auteur} - <span className="fw-bold">Date</span> : {new Date(article.date).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Article;
