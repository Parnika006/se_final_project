import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function LoginModal({
  isOpen,
  closeActiveModal,
  handleSignUpClick,
  handleLogin,
}) {
  const [email, setEmail] = useState({ text: "", isValid: false });
  function handleEmail(e) {
    setEmail({ isValid: e.target.validity.valid, text: e.target.value });
  }
  const [password, setPassword] = useState({ text: "", isValid: false });
  function handlePassword(e) {
    setPassword({ isValid: e.target.validity.valid, text: e.target.value });
  }

  const buttonActive = email.isValid && password.isValid ? true : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email: email.text, password: password.text });
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      buttonText2="Sign up"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onButtonClick={handleSignUpClick}
      handleSubmit={handleSubmit}
      buttonActive={buttonActive}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className="modal__input"
          id="email"
          value={email.text} // // the value is not just email because the email is an object with two properties : text and validiity
          onChange={handleEmail}
          placeholder="Enter email"
          minLength="1"
          maxLength="30"
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          value={password.text} // the value is not just password because the password is an object with two properties : text and validiity
          onChange={handlePassword}
          placeholder="Enter password"
          minLength="6"
          maxLength="10"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
