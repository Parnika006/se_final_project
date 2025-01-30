import "./MenuBar.css";
import { Link } from "react-router-dom";

function MenuBar({ isOpen, handleLoginClick, closeActiveModal }) {
  return (
    <div className={` menu__bar ${isOpen && "menu__bar_opened"}`}>
      <div className="menu__bar-content">
        <div className="menu__bar-header">
          <h1 className="menu__bar-heading">News Explorer</h1>
          <button
            type="button"
            className="menu__bar-close-button"
            onClick={closeActiveModal}
          ></button>
        </div>
        <div className="menu__bar-buttons">
          <Link to="/">
            <button className="menu_bar-home-button" onClick={closeActiveModal}>
              Home
            </button>
          </Link>

          <button
            type="text"
            className="menu_bar-login-button"
            onClick={handleLoginClick}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
