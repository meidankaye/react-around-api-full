function PopupWithForm({
  name,
  isOpen,
  title,
  onClose,
  submitButton,
  onSubmit,
  children,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form name={`form-${name}`} className="popup__form" onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit">
            {submitButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
