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
  menuBarOpen,
}) {
  const navigate = useNavigate();

  const handleSavedArticleButtonClick = () => {
    navigate("/saved-news"); // Navigates to /saved-news
  };

  return (
    <div className="nav">
      <div
        className={`nav__buttons ${menuBarOpen ? "nav__menu-bar-buttons" : ""}`}
      >
        <Link
          to="/"
          className={`nav__home-button ${
            changeCss ? "nav__saved-article-home_button" : ""
          }`}
        >
          Home
        </Link>
        {!isLoggedIn && (
          <button
            type="text"
            className="nav__login-button"
            onClick={handleLoginClick}
          >
            Sign in
          </button>
        )}
        {isLoggedIn && (
          <button
            type="text"
            className={`nav__saved-articles-button ${
              changeCss ? "nav__saved-articles-button-custom" : ""
            }`}
            onClick={handleSavedArticleButtonClick}
          >
            Saved articles
          </button>
        )}

        {isLoggedIn && (
          <button
            type="text"
            className={`nav__username-button ${
              changeCss ? "nav__username-button-custom" : ""
            }`}
            onClick={handleSignOut}
          >
            <span
              className={`nav__username ${
                changeCss ? "nav__username-custom" : ""
              }`}
            >
              Elise
            </span>
            <img
              src={changeCss ? logout_black : logout}
              alt="logout button"
              className="nav__sign-out-button"
            />
          </button>
        )}
      </div>

      {!isOpen && (
        <button
          type="button"
          className="nav__button-menu"
          onClick={handleMenuBarClick}
        ></button>
      )}
    </div>
  );
}

export default Navigation;
