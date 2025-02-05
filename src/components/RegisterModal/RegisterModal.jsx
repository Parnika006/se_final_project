import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({
  isOpen,
  closeActiveModal,
  handleLoginClick,
  handleRegistration,
  handleRegistrationComplete,
}) {
  const [email, setEmail] = useState({ text: "", isValid: false });
  function handleEmail(e) {
    setEmail({ isValid: e.target.validity.valid, text: e.target.value });
  }

  const [password, setPassword] = useState({ text: "", isValid: false });
  function handlePassword(e) {
    setPassword({ isValid: e.target.validity.valid, text: e.target.value });
  }

  const [name, setName] = useState({ text: "", isValid: false });
  function handleName(e) {
    setName({ isValid: e.target.validity.valid, text: e.target.value });
  }

  const buttonActive =
    email.isValid && password.isValid && name.isValid ? true : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({
      email: email.text,
      password: password.text,
      name: name.text,
    });
    handleRegistrationComplete();
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      buttonText2="Sign in"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onButtonClick={handleLoginClick}
      handleSubmit={handleSubmit}
      buttonActive={buttonActive}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          value={email.text}
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
          value={password.text}
          onChange={handlePassword}
          placeholder="Enter password"
          minLength="1"
          maxLength="10"
          required
        />
      </label>
      <label htmlFor="username" className="modal__label">
        Username
        <input
          type="text"
          className="modal__input"
          id="username"
          value={name.text}
          onChange={handleName}
          placeholder="Enter your username"
          minLength="1"
          maxLength="10"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
