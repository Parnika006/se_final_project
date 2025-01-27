import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="header_logo"> NewsExplorer </h1>
      <div className="header__buttons">
        <button type="text" className="header__home-button">
          Home
        </button>
        <button type="text" className="header__login-button">
          Sign in
        </button>
      </div>
      <button type="button" className="header__button-menu"></button>
    </header>
  );
}

export default Header;
