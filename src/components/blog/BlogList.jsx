// src/components/blog/BlogList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import articles from '../../data/articles.json';

const BlogList = () => {
  return (
    <div className="container my-4">
      <h2>Nos Articles</h2>
      <div className="row">
        {articles.map(article => (
          <div key={article.id} className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <img src={article.image_url} className="card-img-top" alt={article.titre} />
              <div className="card-body">
                <h5 className="card-title">{article.titre}</h5>
                <p className="card-text">{article.resume}</p>
                <Link to={`/article/${article.slug}`} className="btn btn-primary">Lire plus</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
