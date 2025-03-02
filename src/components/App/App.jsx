// all imports

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
import SavedArticlesPage from "../SavedArticlesPage/SavedArticlesPage.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import { isLoggedInContext } from "../../contexts/IsLoggedInContext.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import { apiKey } from "../../utils/constants.js";
import { getNews } from "../../utils/newsApi.js";
import { getToken, setToken, removeToken } from "../../utils/token.js";
import CurrentUserContext from "../../contexts/currentUser.jsx";
import { login, register } from "../../utils/auth.js";

import api from "../../utils/api.js";

// main App

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsData, setNewsData] = useState({
    status: "",
    totalResults: "",
    articles: [],
  });

  // all the useStates and variables

  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 articles
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // all the useEffect

  useEffect(() => {
    const jwt = getToken();

    if (jwt) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  /*   useEffect(() => {
    const storedArticles = setSavedArticles(storedArticles);
  }, []); */

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

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      setIsLoggedIn(false);
      return;
    }
    if (!isLoggedIn) {
      return;
    }

    api
      .getUserInfo(jwt)
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          setCurrentUser(data);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        setIsLoggedIn(false);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const jwt = getToken();
    api
      .getArticles(jwt)
      .then((data) => {
        setSavedArticles(data);
      })
      .catch(console.error);
  }, [isLoggedIn]);

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
        if (data.token) {
          setToken(data.token);

          setIsLoggedIn(true);
          setCurrentUser(data.user); // Save the user data

          closeActiveModal();
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate("/");
    removeToken();
    setCurrentUser({ name: "", email: "" });
    setInputValue("");
  };

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

  /*   const handleSaveClick = (articleUrl, article, searchQuery) => {
    if (!isLoggedIn) {
      return;
    }
   

    saveArticle(articleUrl, article, searchQuery)
      .then(() => {
        // setToken(data.token);
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
  } 

 */

  /*  const handleSaveClick = (articleUrl, article, searchQuery) => {
    if (!isLoggedIn) {
      return;
    }
    const token = getToken();

    api
      .saveArticle(articleUrl, article, searchQuery, token)
      .then((newArticle) => {
        setSavedArticles([newArticle.data, ...savedArticles], searchQuery);
      })
      .catch((err) => console.error(err));
  }; */

  /*   const handleSaveClick = (articleUrl, article, searchQuery) => {
    if (!isLoggedIn) {
      return;
    }
    const token = getToken();
    api
      .saveArticle(articleUrl, article, searchQuery, token)
      .then((newArticle) => {
        setSavedArticles((prevState) => {
          const newState = { ...prevState };
          if (newState[newArticle.url]) {
            delete newState[newArticle.url];
          } else {
            newState[newArticle.url] = { ...article, searchQuery };
          }
          return newState;
        });
      })
      .catch((err) => console.error(err));
  }; */

  const handleSaveClick = (article, searchQuery) => {
    if (!isLoggedIn) {
      return;
    }
    const token = getToken();

    api
      .saveArticle(article, searchQuery, token, currentUser._id)
      .then((newArticle) => {
        setSavedArticles((prevState) => {
          const newState = { ...prevState };

          if (newState[newArticle.data.url]) {
            delete newState[newArticle.url];
          } else {
            newState[newArticle.data.url] = {
              ...article,
              searchQuery,
              _id: newArticle.data._id,
              // owner: currentUser._id,
            };
          }

          return newState;
        });

        // Ensure localStorage is updated with the latest saved articles
        setSavedArticles((updatedState) => {
          localStorage.setItem("savedArticles", JSON.stringify(updatedState));
          return updatedState;
        });
      })
      .catch((err) => console.error("Error saving article:", err));
  };

  /* 
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
  }; */

  /* const handleDeleteClick = (article) => {
    const token = getToken();
  
    api
      .deleteArticle(article, token)
      .then(() => {
       
        setSavedArticles(
          savedArticles.filter((card) => card._id !== article._id)
        );
      })
      .catch((err) => console.error(err));
  }; */

  const handleDeleteClick = (article) => {
    const token = getToken();

    api
      .deleteArticle(article, token)
      .then(() => {
        setSavedArticles((prevSavedArticles) =>
          Array.isArray(prevSavedArticles)
            ? prevSavedArticles.filter((card) => card._id !== article._id)
            : []
        );
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
                      inputValue={inputValue}
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
