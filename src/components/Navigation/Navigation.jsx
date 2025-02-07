import "./Navigation.css";
import logout from "../../assets/logout.svg";
import logout_black from "../../assets/logout_black.svg";
import { useNavigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/currentUser";
import { useContext } from "react";

function Navigation({
  handleLoginClick,
  handleMenuBarClick,
  isOpen,
  isLoggedIn,
  handleSignOut,
  changeCss,
  menuBarOpen,
  closeActiveModal,
}) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  const handleSavedArticleButtonClick = () => {
    navigate("/saved-news");
    closeActiveModal(); // Navigates to /saved-news
  };

  const handleHomeButtonClick = () => {
    navigate("/");
    closeActiveModal();
  };

  return (
    <div className="nav">
      <div className={` ${menuBarOpen ? "nav__menu-bar" : "nav__buttons"}`}>
        <button
          className={`nav__home-button
            ${changeCss ? "nav__home-button--saved" : ""}`}
          type="button"
          onClick={handleHomeButtonClick}
        >
          Home
        </button>
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
              changeCss ? "nav__saved-articles-button--custom" : ""
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
              changeCss ? "nav__username-button--custom" : ""
            }`}
            onClick={handleSignOut}
          >
            <span
              className={`nav__username ${
                changeCss ? "nav__username--custom" : ""
              }`}
            >
              {currentUser.name}
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
          className={`nav__button-menu ${
            changeCss ? "nav__button-menu--custom" : ""
          }`}
          onClick={handleMenuBarClick}
        ></button>
      )}
    </div>
  );
}

export default Navigation;
