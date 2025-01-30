import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isOpen,
  closeActiveModal,
  handleSignUpClick,
  handleLogin,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    closeActiveModal();
    handleLogin();
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
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
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
          placeholder="Enter password"
          minLength="1"
          maxLength="10"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
