function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_preview ${card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_preview">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={card ? card.link : ""}
          alt={card?.name}
          className="popup__image-preview"
        />
        <p className="popup__image-name">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
