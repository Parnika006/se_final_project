import "./SavedNews.css";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";

function SavedNews({ savedArticles, handleDeleteClick }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="saved__news">
      <ul className="card-list">
        {Object.values(savedArticles).map((article, index) => (
          <li className="card" key={article.url}>
            <img
              className="card__image"
              src={article.urlToImage}
              alt={article.title}
            />
            <button
              className="card__delete-button"
              type="button"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                handleDeleteClick(article);
              }}
            ></button>

            {hoveredIndex === index && (
              <button type="text" className="delete__button-hover-text">
                Remove from saved
              </button>
            )}

            <p className="card__keyword">{article.searchQuery}</p>

            <div className="card__detail">
              <p className="card__date">{formatDate(article.publishedAt)}</p>

              <a
                href={article.url}
                className="card__url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="card__title">{article.title}</h4>
              </a>
              <p className="card__description">{article.description}</p>
              <p className="card__source">{article.source.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SavedNews;
