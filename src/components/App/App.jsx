import { useState } from "react";

import "./App.css";

import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
/* import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import RegistrationCompletedModal from "../RegistrationCompletedModal/RegistrationCompletedModal.jsx"; */

function App() {
  /*   const [activeModal, setActiveModal] = useState("");

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
  }; */

  return (
    <>
      <Main />
      <About />
      <Footer />
      {/*   {activeModal === "Sign in" && (
        <LoginModal
          isOpen={activeModal === "Sign in"}
          closeActiveModal={closeActiveModal}
          handleSignUpClick={handleSignUpClick}
        />
      )}
      {activeModal === "Sign up" && (
        <RegisterModal
          isOpen={activeModal === "Sign up"}
          closeActiveModal={closeActiveModal}
          handleLoginClick ={handleLoginClick}
        />
      )}
      {activeModal === "Registration successfully completed!" && (
        <RegistrationCompletedModal
          isOpen={activeModal === "Registration successfully completed!"}
          closeActiveModal={closeActiveModal}
          handleLoginClick ={handleLoginClick}
        />
      )} */}
    </>
  );
}

export default App;
