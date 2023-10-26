import React from "react";
import api from "../utils/Api"
import { useEffect, useState } from "react";
import Card from "./Card"

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
        .then(user => {
          setUserName(user.name);
          setUserDescription(user.about);
          setUserAvatar(user.avatar);
        })
        .catch((err) => {
          console.error(err);
        });

        api.getInitialCards()
        .then(cardsArr => {
          setCards(cardsArr);
        })
        .catch((err) => {
          console.error(err);
        })
        }, []);

    return(
        <main className="content">
        <section className="profile">
            <button className="profile__avatar-edit" type="button" onClick={onEditAvatar}>
                <img className="profile__avatar" alt="Аватар пользователя" src={userAvatar} />
            </button>
            <div className="profile__info">
                <div className="profile__title-edit">
                    <h1 className="profile__title">{userName}</h1>
                    <button type="button" id="open-popup-button" className="profile__edit-button" aria-label="Open" onClick={onEditProfile}></button>
                </div>
                <p className="profile__subtitle">{userDescription}</p>
            </div>
            <button id="add-popup-button" type="button" className="profile__add-button" aria-label="Open" onClick={onAddPlace}></button>
        </section>
        <section className="cards">
          {cards.map(card =>
            <Card key={card._id} card={card} onCardClick={onCardClick}/>
          )}
        </section>
    </main>
        )
}

export default Main;