import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Edit profile"
      submitButton="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        type="text"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Name"
        required
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        value={name || ""}
      />
      <span className="popup__error" id="name-input-error"></span>
      <input
        id="profession-input"
        type="text"
        name="profession"
        className="popup__input popup__input_type_profession"
        placeholder="About Me"
        required
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
        value={description || ""}
      />
      <span className="popup__error" id="profession-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
