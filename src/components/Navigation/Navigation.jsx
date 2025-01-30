import "./Navigation.css";
import logout from "../../assets/logout.svg";
import logout_black from "../../assets/logout_black.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navigation({
  handleLoginClick,
  handleMenuBarClick,
  isOpen,
  isLoggedIn,
  handleSignOut,
  changeCss,
}) {
  const navigate = useNavigate();

  const handleSavedArticleButtonClick = () => {
    navigate("/saved-news"); // Navigates to /saved-news
  };

  return (
    <div className="Nav">
      <div className="header__buttons">
        <Link
          to="/"
          className={`header__home-button ${
            changeCss ? "header__saved-article-home_button" : ""
          }`}
        >
          Home
        </Link>
        {!isLoggedIn && (
          <button
            type="text"
            className="header__login-button"
            onClick={handleLoginClick}
          >
            Sign in
          </button>
        )}
        {isLoggedIn && (
          <button
            type="text"
            className={`header__saved-articles-button ${
              changeCss ? "header__saved-articles-button-custom" : ""
            }`}
            onClick={handleSavedArticleButtonClick}
          >
            Saved articles
          </button>
        )}

        {isLoggedIn && (
          <button
            type="text"
            className={`header__username-button ${
              changeCss ? "header__username-button-custom" : ""
            }`}
            onClick={handleSignOut}
          >
            <span
              className={`header__username ${
                changeCss ? "header__username-custom" : ""
              }`}
            >
              Elise
            </span>
            <img
              src={changeCss ? logout_black : logout}
              alt="logout button"
              className="header__sign-out-button"
            />
          </button>
        )}
      </div>

      {!isOpen && (
        <button
          type="button"
          className="header__button-menu"
          onClick={handleMenuBarClick}
        ></button>
      )}
    </div>
  );
}

export default Navigation;
