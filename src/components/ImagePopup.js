import React from "react";

function ImagePopup({card, onClose}) {
    return (
        <section id="popup-photo" className={`popup popup_black ${card ? 'popup_is-opened' : ''}`}>
            <div className="popup__conteiner-photo">
                <button id="close-popup-photo" className="popup__close-button popup__photo-button" type="button" aria-label="Close" onClick={onClose}></button>
                <img className="popup__image-full" src={`${card.link}`} alt={card.name} />
                <p className="popup__name-photo">{`${card.name}`}</p>
            </div>
        </section>
    );
}

export default ImagePopup;