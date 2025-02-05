import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegistrationCompletedModal({
  handleLoginClick,
  closeActiveModal,
  isOpen,
}) {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      buttonText=""
      buttonText2="Sign in"
      onButtonClick={handleLoginClick}
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
    />
  );
}

export default RegistrationCompletedModal;
