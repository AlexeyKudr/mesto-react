import React from "react";

function PopupWithForm({ isOpen, name, title, children, onClose, buttonText }) {
    const className = isOpen ? 'popup_is-opened' : '';
    return (
        <div className={`popup ${className}`}>
            <div className="popup__content">
            <form name={name} className={`popup__form`}>
                <h2 className="popup__title">{title}</h2>
                    {children}
                    <button type="submit" className='popup__button'>{buttonText}</button>
                </form>
                <button type="button" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;