import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardDeleteButtonClassName = `place__trash ${
    isOwn ? "" : "place__trash_hidden"
  }`;
  const cardLikeButtonClassName = `place__button ${
    isLiked ? "place__button_active" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="places__item place">
      <div className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
      <div
        className="place__image"
        onClick={handleCardClick}
        style={{ backgroundImage: `url(${card.link})` }}
      />
      <div className="place__details">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-wrapper">
          <div
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></div>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
