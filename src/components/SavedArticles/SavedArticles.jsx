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
    </div>
  );
}

export default SavedArticles;
