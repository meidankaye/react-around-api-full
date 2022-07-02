import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputAvatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }

  React.useEffect(() => {
    inputAvatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      submitButton="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        type="url"
        name="link"
        className="popup__input popup__input_type_link"
        placeholder="Avatar link"
        ref={inputAvatarRef}
        required
      />
      <span className="popup__error" id="avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
