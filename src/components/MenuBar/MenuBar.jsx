import "./MenuBar.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function MenuBar({
  isOpen,
  handleLoginClick,
  closeActiveModal,
  handleSignOut,
}) {
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
        <Navigation
          menuBarOpen={true}
          handleLoginClick={handleLoginClick}
          handleSignOut={handleSignOut}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
}

export default MenuBar;
