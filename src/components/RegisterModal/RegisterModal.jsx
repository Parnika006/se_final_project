import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal() {
  return (
    <ModalWithForm title="Sign up" buttonText="Sign up" buttonText2="Sign in">
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
      <label htmlFor="username" className="modal__label">
        Username
        <input
          type="text"
          className="modal__input"
          id="username"
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
