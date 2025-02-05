import "./SearchResults.css";
import { useState } from "react";
import not_found from "../../assets/not_found.svg";
import PreLoader from "../Preloader/Preloader";

function SearchResults({
  newsData,
  isLoading,
  setVisibleCount,
  visibleCount,
  isLoggedIn,
  savedArticles,
  handleSaveClick,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  /*   const [savedArticles, setSavedArticles] = useState({});

  const handleSaveClick = (index) => {
    if (!isLoggedIn) {
      return;
    }

    setSavedArticles((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle saved state for the specific article
    }));
  }; */

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 3, newsData.articles.length)
    ); // Show 3 more on each click
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format the date to "Month Day, Year" (e.g., February 3, 2025)
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

    return formattedDate;
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
        <h1 className="not__found-heading">Nothing found</h1>
        <p className="not__found-content">
          Sorry, but nothing matched your search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="search__results">
      <h1 className="search__results-heading">Search results</h1>
      <ul className="card-list">
        {newsData.articles.slice(0, visibleCount).map((article, index) => (
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
        ))}
      </ul>
      {visibleCount < newsData.articles.length && (
        <button
          type="button"
          className="show__more-button"
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
    </div>
  );
}

export default SearchResults;
