import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name: title,
      link,
    });
  }

  React.useEffect(() => { 
    setTitle(""); 
    setLink(""); 
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="New Place"
      submitButton="Create"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="title-input"
        type="text"
        name="title"
        className="popup__input popup__input_type_title"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
        value={title}
        onChange={handleTitleChange}
      />
      <span className="popup__error" id="title-input-error"></span>
      <input
        id="link-input"
        type="url"
        name="link"
        className="popup__input popup__input_type_link"
        placeholder="Image link"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__error" id="link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
