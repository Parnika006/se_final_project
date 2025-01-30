import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegistrationCompletedModal({ handleLoginClick }) {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      buttonText=""
      buttonText2="Sign in"
      onButtonClick={handleLoginClick}
    />
  );
}

export default RegistrationCompletedModal;
