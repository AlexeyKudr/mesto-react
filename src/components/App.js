import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import CurrentUserContext from './contexts/CurrentUserContext';
import api from "../utils/Api"
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState();
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState();
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState();
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
  
    useEffect(() => {
      api.getUserInfo()
          .then((userData) => {
              setCurrentUser(userData);
          })
          .catch((err) => {
            console.error(err);
          })
  }, []);

  useEffect(() => {
    api.getInitialCards()
    .then(cardsArr => {
      setCards(cardsArr);
    })
    .catch((err) => {
      console.error(err);
    })
    }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error(err);
      })
  }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
      }
    
      function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
      }
    
      function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
      }

      function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    useEffect(() => {
      function handleEscClose(evt) {
          if (evt.key === 'Escape') {
              closeAllPopups();
          }
      }

      function handleOverlayClose(evt) {
          if (evt.target.classList.contains('popup')) {
              closeAllPopups();
          }
      }

      window.addEventListener('keydown', handleEscClose);
      window.addEventListener('mousedown', handleOverlayClose);

      return () => {
          window.removeEventListener('keydown', handleEscClose);
          window.removeEventListener('mousedown', handleOverlayClose);
          document.body.classList.add('body');
      };
  }, []);

    function handleClick(card) {
      setSelectedCard(card);
    }

    function handleUpdateUser({ name, about }) {
      api.setUserInfo(name, about)
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    });
  }
    function handleUpdateAvatar(data) {
      api.setUserAvatar(data.avatar)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const handleAddPlaceSubmit = (data) => {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

function handleCardDelete (card) {
  api.deleteCard(card._id)
  .then(() => {
      setCards((stateDelete) => stateDelete.filter((c) => c._id !== card._id));
  })
  .catch((err) => {
    console.error(err);

  })
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} 
      onCardClick={handleClick} onCardLike={handleCardLike} cards={cards} onCardDelete={handleCardDelete} />
      <Footer />
      <EditProfilePopup closeAllPopups={closeAllPopups} onUpdateUser={handleUpdateUser} isEditProfilePopupOpen={isEditProfilePopupOpen} />
      <AddPlacePopup isAddPlacePopupOpen={isAddPlacePopupOpen} closeAllPopups={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup isEditAvatarPopupOpen={isEditAvatarPopupOpen} closeAllPopups={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <ImagePopup card={selectedCard} closeAllPopups={closeAllPopups} />
    </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
