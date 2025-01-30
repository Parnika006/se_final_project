import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header({
  handleLoginClick,
  handleMenuBarClick,
  isOpen,
  isLoggedIn,
  handleSignOut,
  changeCss,
}) {
  return (
    <header
      className={`header${
        isLoggedIn && changeCss ? " header__saved-article" : ""
      }`}
    >
      <Link
        to="/"
        className={`header__logo${
          isLoggedIn && changeCss ? " header__saved-article-logo" : ""
        }`}
      >
        {" "}
        NewsExplorer{" "}
      </Link>
      <Navigation
        handleLoginClick={handleLoginClick}
        handleMenuBarClick={handleMenuBarClick}
        isOpen={isOpen}
        isLoggedIn={isLoggedIn}
        handleSignOut={handleSignOut}
        changeCss={changeCss}
      />
    </header>
  );
}

export default Header;
