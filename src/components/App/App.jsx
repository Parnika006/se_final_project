// all imports

import { createContext, useState, useEffect } from "react";
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
import SavedArticlesPage from "../SavedArticlesPage/SavedArticlesPage.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import { isLoggedInContext } from "../../contexts/IsLoggedInContext.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import { apiKey } from "../../utils/constants.js";
import { getNews } from "../../utils/newsApi.js";
import { getToken, setToken, removeToken } from "../../utils/token.js";
import CurrentUserContext from "../../contexts/currentUser.jsx";
import {
  deleteArticle,
  login,
  register,
  saveArticle,
} from "../../utils/auth.js";

// main App

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsData, setNewsData] = useState({
    status: "",
    totalResults: "",
    articles: [],
  });

  // all the useStates and variables

  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 articles
  const [savedArticles, setSavedArticles] = useState({});
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // all the useEffect

  useEffect(() => {
    const jwt = getToken();

    if (jwt) {
      setIsLoggedIn(true);
      const user = localStorage.getItem("user");
      const email = localStorage.getItem("email");
      console.log({ email, user });
      setCurrentUser({ name: user, email });
      // eventually we will add the api with the jwt token
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const storedArticles =
      JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(storedArticles);
  }, []);

  useEffect(() => {
    if (!activeModal) return; // remove the listener if there is no active modal

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

  // all functions

  const closeActiveModal = () => {
    setActiveModal("");
  };

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

  const handleRegistration = ({ email, password, name }) => {
    setIsLoading(true);
    register(email, password, name)
      .then(() => {
        handleRegistrationComplete();
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    // If username or password empty, return without sending a request.
    if (!email || !password) {
      return;
    }
    login(email, password)
      .then((data) => {
        setToken(data.token);
        // localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", data.user.name);
        localStorage.setItem("email", data.user.email);
        setIsLoggedIn(true);
        console.log(data);
        setCurrentUser(data.user); // Save the user data
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Login failed:", error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
    removeToken();
    setSavedArticles({});
    setSearchQuery("");
    setCurrentUser({ name: "", email: "" });
  };

  const handleSearch = (searchQuery) => {
    if (!searchQuery) return;
    setIsLoading(true); // Start loading
    getNews(searchQuery, apiKey)
      .then((data) => {
        setNewsData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  };

  const handleSaveClick = (articleUrl, article, searchQuery) => {
    if (!isLoggedIn) {
      return;
    }
    saveArticle(articleUrl, article, searchQuery)
      .then(() => {
        /*  setToken(data.token); */
        setSavedArticles((prevState) => {
          const newState = { ...prevState };
          if (newState[articleUrl]) {
            delete newState[articleUrl];
          } else {
            newState[articleUrl] = { ...article, searchQuery };
          }
          // Store in localStorage inside setSavedArticles to get the updated state
          localStorage.setItem("savedArticles", JSON.stringify(newState));
          return newState;
        });
      })
      .catch((err) => console.error(err));
  };

  /*   const handleSaveClick = (articleUrl, article, searchQuery) => {
    if (!isLoggedIn) {
      return;
    }

    setSavedArticles((prevState) => {
      const newState = { ...prevState };

      if (newState[articleUrl]) {
        delete newState[articleUrl];
      } else {
        newState[articleUrl] = { ...article, searchQuery };
      }

      // Store in localStorage inside setSavedArticles to get the updated state
      localStorage.setItem("savedArticles", JSON.stringify(newState));

      console.log("Updated Saved Articles:", newState); // Debugging

      return newState;
    });
  }; */

  /* 
  const handleDeleteClick = (url) => {
    setSavedArticles((prevState) => {
      const newState = { ...prevState };
      delete newState[url]; // Remove the saved article by its URL
      return newState;
    });
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }; */

  const handleDeleteClick = (url) => {
    deleteArticle(url)
      .then(() => {
        setSavedArticles((prevState) => {
          const newState = { ...prevState };
          delete newState[url]; // Remove the saved article by its URL
          return newState;
        });
        localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
      })
      .catch((err) => console.error(err));
  };

  return (
    <isLoggedInContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
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
                    closeActiveModal={closeActiveModal}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
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
                      searchQuery={searchQuery}
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
                  <SavedArticlesPage
                    isLoggedIn={isLoggedIn}
                    handleSignOut={handleSignOut}
                    handleMenuBarClick={handleMenuBarClick}
                    savedArticles={savedArticles}
                    handleDeleteClick={handleDeleteClick}
                    closeActiveModal={closeActiveModal}
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
      </CurrentUserContext.Provider>
    </isLoggedInContext.Provider>
  );
}

export default App;
