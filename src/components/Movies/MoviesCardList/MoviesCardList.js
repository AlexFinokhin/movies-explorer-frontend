import MoviesCard from "../MoviesCard/MoviesCard.js";

const MoviesCardList = ({ cardList, cardButtonStyle }) => {
  return (
    <section className="movies-card">
      <div className="movies-card__set">
        {cardList.map((card) => (
          <MoviesCard
            key={card.movieId}
            duration={card.duration}
            image={card.image}
            name={card.nameRU}
            movieId={card.movieId}
            cardButtonStyle={cardButtonStyle}
          />
        ))}
      </div>
      <button className="movies-card__button">Ещё</button>
    </section>
  );
};

export default MoviesCardList;
