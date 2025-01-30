import "./SavedArticles.css";
import Header from "../Header/Header";
import NewsCard from "../NewsCard/NewsCard";

function SavedArticles({ isLoggedIn, handleSignOut }) {
  return (
    <div className="saved__articles">
      <Header
        isLoggedIn={isLoggedIn}
        handleSignOut={handleSignOut}
        changeCss={true}
      />

      <NewsCard />
    </div>
  );
}

export default SavedArticles;
