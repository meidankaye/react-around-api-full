import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Login from "./Login";
import Register from "./Register";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useEffect } from "react";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import api from "../utils/api";
import { register, authorize, validateToken } from "../utils/auth";
import ProtectedRoute from "../components/ProtectedRoute";
import InfoToolTip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [values, setValues] = React.useState({ email: "", password: "" });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    }).catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    }).catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleUpdateUser(userData) {
    api
      .updateProfile(userData)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleUpdateAvatar(userData) {
    api
      .updateUserImage(userData)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmClick() {
    setIsConfirmPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleLogin({ email, password }) {
    authorize({ email, password })
      .then((user) => {
        if (user) {
          localStorage.setItem("jwt", user.token);
          setLoggedIn(true);
          setCurrentUser(email);

          navigate("/");
        } else {
          setIsInfoToolTipOpen(true);
          throw new Error("No token recieved!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleResgister({ email, password }) {
    register({ email, password })
      .then((user) => {
        navigate("/signin");
        setRegistered(true);
      })
      .catch((err) => {
        console.log(err);
        setRegistered(false);
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    token &&
      validateToken(token)
        .then((res) => {
          setValues(res.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  function handleLogout(e) {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setValues("");
    navigate("signin");
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(undefined);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
          <InfoToolTip
            name={"registration"}
            onClose={closeAllPopups}
            status={registered}
            isOpen={isInfoToolTipOpen}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            name="confirm"
            title="Are you sure?"
            submitButton="Yes"
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Header
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            user={values}
          />
          <Routes>
            <Route
              path="/signin"
              element={<Login onSubmit={handleLogin} loggedIn />}
            />
            <Route
              path="/signup"
              element={<Register onSubmit={handleResgister} loggedIn />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    cards={cards}
                    onConfirmclick={handleConfirmClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
