import { useState } from "react";
import { convertByDuration } from "../../../hooks/useFiltres";
import { MOVIE_URL } from "../../../utils/constants";

const MoviesCard = ({
  saved,
  card,
  isSavedMovies,
  onLike,
  onDelete,
  savedMovies,
}) => {
  const [isButtonSaved, setIsButtonSaved] = useState(saved);

  const onButtonClick = () => {
    if (saved) {
      onDelete(savedMovies.filter((m) => m.movieId === card.id)[0]);
    } else {
      onLike(card);
    }
    setIsButtonSaved(!isButtonSaved);
  };

  const onButtonDeleteClick = () => {
    onDelete(card);
  };

  const cardSaveButtonClassName = `card__button ${
    !saved
      ? "card__button-save"
      : onLike
      ? "card__button-saved"
      : "card__button-delete"
  }`;

  return (
    <article className="card">
      <div className="card__container">
        <h5 className="card__title">{card.nameRU}</h5>
        <span className="card__duration">
          {convertByDuration(card.duration)}
        </span>
      </div>
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          alt={card.nameRU}
          src={isSavedMovies ? card.image : `${MOVIE_URL}${card.image.url}`}
          className="card__image"
        />
      </a>
      {isSavedMovies ? (
        <button
          type="button"
          className="card__button card__button-delete"
          onClick={onButtonDeleteClick}
        ></button>
      ) : (
        <button
          type="button"
          className={cardSaveButtonClassName}
          onClick={onButtonClick}
        >
          {!isButtonSaved ? "" : onLike ? "" : ""}
        </button>
      )}
    </article>
  );
};

export default MoviesCard;
