import Preloader from "../../Preloader/Preloader";
import SavedMoviesCardSet from "../SavedMoviesCardSet/SavedMoviesCardSet";
import MoviesCardSet from "../MoviesCardSet/MoviesCardSet";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import NotFoundMessage from "../NotFoundMessage/NotFoundMessage";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { useVisibleCount } from "../../../hooks/useVisibleCount";
import {
  MOVIES_INCREMENT_3,
  MOVIES_INCREMENT_2,
} from "../../../utils/constants";

const MoviesCardList = ({
  savedMovies,
  cards,
  isSavedMovies,
  isLoading,
  isRequestError,
  isNotFound,
  onLike,
  onDelete,
}) => {
  const [visibleMovies, setVisibleMovies] = useVisibleCount();
  const path = window.location.pathname;

  const showMore = () => {
    const width = window.innerWidth;

    const breakpoints = [
      { width: 1279, increment: MOVIES_INCREMENT_3 },
      { width: 768, increment: MOVIES_INCREMENT_2 },
      { width: 0, increment: MOVIES_INCREMENT_2 },
    ];

    const defaultIncrement = MOVIES_INCREMENT_2;

    const { increment } = breakpoints.find(
      (breakpoint) => width > breakpoint.width
    ) || { increment: defaultIncrement };

    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + increment);
  };

  return (
    <section className="movies-card">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {isNotFound && <NotFoundMessage />}
          {isRequestError && <ErrorMessage />}
          {!isRequestError && !isNotFound && (
            <>
              {path === "/saved-movies" ? (
                <SavedMoviesCardSet
                  savedMovies={savedMovies}
                  cards={cards}
                  isSavedMovies={isSavedMovies}
                  onLike={onLike}
                  onDelete={onDelete}
                />
              ) : (
                <>
                  <MoviesCardSet
                    cards={cards}
                    visibleMovies={visibleMovies}
                    savedMovies={savedMovies}
                    isSavedMovies={isSavedMovies}
                    onLike={onLike}
                    onDelete={onDelete}
                  />
                  {cards.length > visibleMovies && (
                    <LoadMoreButton onClick={showMore} />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default MoviesCardList;
