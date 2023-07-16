import MoviesCard from "../MoviesCard/MoviesCard.js";

const SavedMoviesCardSet = ({
  savedMovies,
  cards,
  isSavedMovies,
  onLike,
  onDelete,
}) => {
  const getCard = (savedMovies, card) => {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  };

  return (
    <div className="movies-card__set">
      {cards.map((card) => (
        <MoviesCard
          key={isSavedMovies ? card._id : card.id}
          saved={getCard(savedMovies, card)}
          cards={cards}
          card={card}
          isSavedMovies={isSavedMovies}
          onLike={onLike}
          onDelete={onDelete}
          savedMovies={savedMovies}
        />
      ))}
    </div>
  );
};

export default SavedMoviesCardSet;
