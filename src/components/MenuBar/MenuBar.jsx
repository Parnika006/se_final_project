import "./MenuBar.css";

import Navigation from "../Navigation/Navigation";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function MenuBar({
  isOpen,
  handleLoginClick,
  closeActiveModal,
  handleSignOut,
  isLoggedIn,
}) {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 620) {
        closeActiveModal();
      }
    }
    if (isOpen) {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, closeActiveModal]);

  return (
    <div className={` menu__bar ${isOpen && "menu__bar_opened"}`}>
      <div className="menu__bar-content">
        <div className="menu__bar-header">
          <Link to="/" className="menu__bar-heading">
            News Explorer
          </Link>
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
          isLoggedIn={isLoggedIn}
          closeActiveModal={closeActiveModal}
        />
      </div>
    </div>
  );
}

export default MenuBar;
