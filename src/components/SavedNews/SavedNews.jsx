import "./SavedNews.css";

function SavedNews() {
  return (
    <div className="saved__news">
      <ul className="card-list">
        <li key={index} className="card">
          <img
            className="card__image"
            src={article.urlToImage}
            alt={article.title}
          />
          <button
            className={`card__save-button ${
              isLoggedIn ? "card__save-button-active" : ""
            }
              ${savedArticles[index] ? "card__save-button-marked" : ""}
            }`}
            type="button"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleSaveClick(index)}
          >
            {" "}
          </button>
          {!isLoggedIn && hoveredIndex === index && (
            <button type="text" className="save__button-hover-text">
              Sign in to save articles
            </button>
          )}
          <div className="card__detail">
            <p className="card__date">{formatDate(article.publishedAt)}</p>

            <a
              href={article.url}
              className="card__url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="card__title">{article.title}</h2>
            </a>
            <p className="card__description">{article.description}</p>
            <p className="card__source">{article.source.name}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SavedNews;
