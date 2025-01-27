import "./ModalWithForm.css";

function ModalWithForm({ title, children, buttonText, buttonText2 }) {
  return (
    <div className={`modal ${"modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close" />
        <form className="modal__form">
          {children}
          <div className="modal__buttons">
            {buttonText && (
              <button type="submit" className="modal__submit">
                {buttonText}
              </button>
            )}
            <div className="modal__button">
              {buttonText && <p className="modal__text-or">or</p>}
              <button type="button" className="modal__button-option">
                {buttonText2}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

// <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
