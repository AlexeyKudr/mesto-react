import React from "react";

function Card({card, onCardClick}) {

    function handleClick() {
      onCardClick(card);
    }
  
    return (
        <article className="card">
        <button className="card__delete" type="button" aria-label="Delete"></button>
        <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
        <div className="card__info">
            <h2 className="card__title">{card.name}</h2>
            <div>
                <button className="card__like" type="button" aria-label="Like"></button>
                <span className="card__likes-counter">{card.likes.length}</span>
            </div>
        </div>
    </article>
    )
  }
  
  export default Card;
