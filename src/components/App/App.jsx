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
import SavedArticles from "../SavedArticles/SavedArticles.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import { isLoggedInContext } from "../../contexts/IsLoggedInContext.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import { apiKey } from "../../utils/constants.js";
import { getNews } from "../../utils/newsApi.js";
import { getToken } from "../../utils/token.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsData, setNewsData] = useState({
    status: "",
    totalResults: "",
    articles: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 articles
  const [savedArticles, setSavedArticles] = useState({});

  const navigate = useNavigate();

  console.log(isLoading);

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  /*  useEffect(() => {
    const jwt =getToken();

    if (jwt) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
 */

  /*   useEffect(() => {
    if (!searchQuery) return;

    setIsLoading(true);
    getNews(searchQuery, apiKey)
      .then((data) => {
        setNewsData(data);
        console.log(data);
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  }, [searchQuery]); */

  const handleSearch = (searchQuery) => {
    if (!searchQuery) return;
    setIsLoading(true); // Start loading
    getNews(searchQuery, apiKey)
      .then((data) => {
        setNewsData(data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  };

  const handleSaveClick = (index) => {
    if (!isLoggedIn) {
      return;
    }

    setSavedArticles((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle saved state for the specific article
    }));
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
    // simulate jwt token for login refresh
    localStorage.setItem("jwt", "test");
    console.log("user is logged in", isLoggedIn);
    closeActiveModal();
  };

  const handleRegistration = () => {
    closeActiveModal();
    handleRegistrationComplete();
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
    setSavedArticles({});
    setSearchQuery("");
    window.location.reload(); // to reset the value of inputValue in the search form
    console.log("user is logged out", isLoggedIn);
  };

  return (
    <isLoggedInContext.Provider value={isLoggedIn}>
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  handleLoginClick={handleLoginClick}
                  handleMenuBarClick={handleMenuBarClick}
                  isOpen={
                    activeModal === "Sign in" || activeModal === "Sign up"
                  }
                  isLoggedIn={isLoggedIn}
                  handleSignOut={handleSignOut}
                  setSearchQuery={setSearchQuery}
                  setVisibleCount={setVisibleCount}
                  handleSearch={handleSearch}
                />

                {searchQuery && (
                  <SearchResults
                    newsData={newsData}
                    isLoading={isLoading}
                    setVisibleCount={setVisibleCount}
                    visibleCount={visibleCount}
                    isLoggedIn={isLoggedIn}
                    savedArticles={savedArticles}
                    handleSaveClick={handleSaveClick}
                  />
                )}

                <About />
              </>
            }
          />

          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedArticles
                  isLoggedIn={isLoggedIn}
                  handleSignOut={handleSignOut}
                  handleMenuBarClick={handleMenuBarClick}
                />
              </ProtectedRoute>
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
            handleRegistration={handleRegistration}
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
            handleSignOut={handleSignOut}
            isLoggedIn={isLoggedIn}
          />
        )}
      </div>
    </isLoggedInContext.Provider>
  );
}

export default App;
