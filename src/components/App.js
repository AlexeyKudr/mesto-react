import { useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState();
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState();
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState();
    const [selectedCard, setSelectedCard] = useState({});


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

    function handleClick(card) {
      setSelectedCard(card);
    }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleClick}/>
      <Footer />

      <PopupWithForm title='Редактировать профиль' name='profile-edit' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
      <input id="name-input" type="text" className="popup__input popup__input_type_title" name="name" placeholder="Имя" required minLength="2" maxLength="40" />
                    <span id="name-input-error"></span>
                    <input id="input-subtitle" type="text" className="popup__input popup__input_type_subtitle" name="about" placeholder="О себе" required minLength="2" maxLength="200" />
                    <span id="input-subtitle-error"></span>
      </PopupWithForm>

      <PopupWithForm title='Новое место' name='add-card' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Добавить">
      <input id="card-input-title" type="text" className="popup__input popup__input_type_title" name="name" placeholder="Название" required minLength="2" maxLength="30" />
                    <span id="card-input-title-error"></span>
                    <input id="place-input-subtitle" type="url" className="popup__input popup__input_type_subtitle" name="link" placeholder="Ссылка на картинку" required />
                    <span id="place-input-subtitle-error"></span>
      </PopupWithForm>

      <PopupWithForm title='Вы уверены?' name='delete-card'>
      <button type="submit" className="popup__button">Да</button></PopupWithForm>

      <PopupWithForm title='Обновить аватар' name='edit-avatar' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
      <input id="avatar" className="popup__input popup__input_avatar" name="avatar" type="url" placeholder="Ссылка на картинку" required />
                    <span id="avatar-error"></span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
