import successLogo from "../images/successLogo.svg";
import errorLogo from "../images/errorLogo.svg";

export default function InfoToolTip(props) {
  const { isOpen, onClose, status, name } = props;
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""} `}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__auth-image"
          alt="Status logo"
          src={status === false ? errorLogo: successLogo}
        />
        <h2 className="popup__registration-text">
          {status === false
            ? "Oops, something went wrong! Please try again."
            : "Success! You have now been registered."}
        </h2>
      </div>
    </div>
  );
}
