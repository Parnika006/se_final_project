import "./SavedArticles.css";
import Header from "../Header/Header";
import SavedNews from "../SavedNews/SavedNews";
import CurrentUserContext from "../../contexts/currentUser";
import { useContext } from "react";

function SavedArticles({
  isLoggedIn,
  handleSignOut,
  handleMenuBarClick,
  savedArticles,
  handleDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const savedArticlesCount = Object.keys(savedArticles).length;

  const keywords = Array.from(
    new Set(Object.values(savedArticles).map((article) => article.searchQuery))
  ).filter(Boolean); // Remove any falsy values (null, undefined, etc.)

  // Format keywords display
  let keywordText = "No keywords";
  if (keywords.length === 1) {
    keywordText = keywords[0];
  } else if (keywords.length === 2) {
    keywordText = keywords.join(" and ");
  } else if (keywords.length > 2) {
    keywordText = `${keywords.slice(0, 2).join(", ")} and ${
      keywords.length - 2
    } other${keywords.length - 2 > 1 ? "s" : ""}`;
  }

  return (
    <div className="saved__articles">
      <Header
        isLoggedIn={isLoggedIn}
        handleSignOut={handleSignOut}
        changeCss={true}
        handleMenuBarClick={handleMenuBarClick}
      />
      <div className="saved__articles-main">
        <h2 className="saved__header">Saved Articles</h2>
        <p className="saved__content">
          {currentUser.name}, you have <span>{savedArticlesCount} </span>saved
          articles
        </p>
        <p className="saved__keyword-heading">
          By keywords:
          <span className="saved__keywords">{keywordText}</span>
        </p>
      </div>
      {savedArticlesCount > 0 && (
        <SavedNews
          handleDeleteClick={handleDeleteClick}
          savedArticles={savedArticles}
        />
      )}
    </div>
  );
}

export default SavedArticles;
