import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardSet = ({
  cards,
  visibleMovies,
  savedMovies,
  isSavedMovies,
  onLike,
  onDelete,
}) => {
  const getCard = (savedMovies, card) => {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  };

  return (
    <div className="movies-card__set">
      {cards.slice(0, visibleMovies).map((card) => (
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

export default MoviesCardSet;
