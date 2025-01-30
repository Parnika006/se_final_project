import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./App.css";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import RegistrationCompletedModal from "../RegistrationCompleted/RegistrationCompletedModal.jsx";
import MenuBar from "../MenuBar/MenuBar.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import Header from "../Header/Header.jsx";
import SavedArticles from "../SavedArticles/SavedArticles.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleLoginClick = () => {
    setActiveModal("Sign in");
  };

  const handleSignUpClick = () => {
    setActiveModal("Sign up");
  };

  const handleRegistrationComplete = () => {
    setActiveModal("Registration successfully completed!");
  };

  const handleMenuBarClick = () => {
    setActiveModal("MenuBar");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("user is logged in", isLoggedIn);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate("/");
    console.log("user is logged out", isLoggedIn);
  };

  return (
    <div className="page__content">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main
                handleLoginClick={handleLoginClick}
                handleMenuBarClick={handleMenuBarClick}
                isOpen={activeModal === "Sign in" || activeModal === "Sign up"}
                isLoggedIn={isLoggedIn}
                handleSignOut={handleSignOut}
              />
              <About />
            </>
          }
        />

        <Route
          path="/saved-news"
          element={
            // <ProtectedRoute isLoggedIn={isLoggedIn}>
            <SavedArticles
              isLoggedIn={isLoggedIn}
              handleSignOut={handleSignOut}
            />
            // </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      {activeModal === "Sign in" && (
        <LoginModal
          isOpen={activeModal === "Sign in"}
          closeActiveModal={closeActiveModal}
          handleSignUpClick={handleSignUpClick}
          handleLogin={handleLogin}
        />
      )}
      {activeModal === "Sign up" && (
        <RegisterModal
          isOpen={activeModal === "Sign up"}
          closeActiveModal={closeActiveModal}
          handleLoginClick={handleLoginClick}
          handleRegistrationComplete={handleRegistrationComplete}
        />
      )}
      {activeModal === "Registration successfully completed!" && (
        <RegistrationCompletedModal
          isOpen={activeModal === "Registration successfully completed!"}
          closeActiveModal={closeActiveModal}
          handleLoginClick={handleLoginClick}
        />
      )}
      {activeModal === "MenuBar" && (
        <MenuBar
          isOpen={activeModal === "MenuBar"}
          handleLoginClick={handleLoginClick}
          closeActiveModal={closeActiveModal}
        />
      )}
    </div>
  );
}

export default App;
