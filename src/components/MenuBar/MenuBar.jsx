import "./MenuBar.css";

function MenuBar() {
  return (
    <div className="menu__bar">
      <div className="menu__bar-content">
        <div className="menu__bar-header">
          <h1 className="menu__bar-heading">News Explorer</h1>
          <button type="button" className="menu__bar-close-button"></button>
        </div>
        <div className="menu__bar-buttons">
          <button type="text" className="menu_bar-home-button">
            Home
          </button>
          <button type="text" className="menu_bar-login-button">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
