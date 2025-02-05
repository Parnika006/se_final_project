import "./SavedArticles.css";
import Header from "../Header/Header";

function SavedArticles({ isLoggedIn, handleSignOut, handleMenuBarClick }) {
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
        <p className="saved__content">Elise, you have 5 saved articles</p>
        <p className="saved__keyword-heading">
          By keywords:
          <span className="saved__keywords">
            Nature, Yellowstone, and 2 other
          </span>
        </p>
      </div>
    </div>
  );
}

export default SavedArticles;
