import "./SearchResults.css";
import { useState } from "react";
import not_found from "../../assets/not_found.svg";
import PreLoader from "../Preloader/Preloader";
import { formatDate } from "../../utils/formatDate";

function SearchResults({
  newsData,
  isLoading,
  setVisibleCount,
  visibleCount,
  isLoggedIn,
  savedArticles,
  handleSaveClick,
  searchQuery,
  inputValue,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 3, newsData.articles.length)
    ); // Show 3 more on each click
  };

  if (isLoading) {
    return <PreLoader />;
  }

  if (newsData.status !== "ok") {
    return (
      <div className="search__result-not-found">
        <p className="not__found-content">
          Sorry, something went wrong during the request. Please try again
          later.{" "}
        </p>
      </div>
    );
  }

  if (newsData.totalResults === 0) {
    return (
      <div className="search__result-not-found">
        <img
          className="not__found-image"
          src={not_found}
          alt="not found image"
        />
        <p className="not__found-heading">Nothing found</p>
        <p className="not__found-content">
          Sorry, but nothing matched your search terms.
        </p>
      </div>
    );
  }

  return (
    inputValue && (
      <section className="search__results">
        <h2 className="search__results-heading">Search results</h2>
        <ul className="card-list">
          {newsData.articles.slice(0, visibleCount).map((article, index) => (
            <li key={article.url} className="card">
              <img
                className="card__image"
                src={article.urlToImage}
                alt={article.title}
              />
              <button
                className={`card__save-button ${
                  isLoggedIn ? "card__save-button-active" : ""
                }
                ${savedArticles[article.url] ? "card__save-button-marked" : ""}
              }`}
                type="button"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSaveClick(article, searchQuery)}
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
                  <h4 className="card__title">{article.title}</h4>
                </a>
                <p className="card__description">{article.description}</p>
                <p className="card__source">{article.source.name}</p>
              </div>
            </li>
          ))}
        </ul>
        {visibleCount < newsData.articles.length && (
          <button
            type="button"
            className="search__results-show-more-button"
            onClick={handleShowMore}
          >
            Show more
          </button>
        )}
      </section>
    )
  );
}

export default SearchResults;
