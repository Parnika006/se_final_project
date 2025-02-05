import "./ModalWithForm.css";

function ModalWithForm({
  title,
  children,
  buttonText,
  buttonText2,
  closeActiveModal,
  isOpen,
  onButtonClick,
  handleSubmit,
  buttonActive,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={closeActiveModal}
        />
        <form className="modal__form">
          {children}
          <div className="modal__buttons">
            {buttonText && (
              <button
                type="submit"
                className={`modal__submit ${
                  buttonActive && "modal__submit--active"
                }`}
                onClick={handleSubmit}
              >
                {buttonText}
              </button>
            )}
            <div className="modal__button">
              {buttonText && <p className="modal__text-or">or</p>}
              <button
                type="button"
                className="modal__button-option"
                onClick={onButtonClick}
              >
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
