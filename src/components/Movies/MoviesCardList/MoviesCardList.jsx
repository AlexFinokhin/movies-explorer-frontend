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
  MOVIES_BREAKPOINT_1280,
  MOVIES_BREAKPOINT_1279,
  MOVIES_BREAKPOINT_1278,
  MOVIES_BREAKPOINT_1130,
  MOVIES_BREAKPOINT_766,
  MOVIES_BREAKPOINT_0,
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
      { width: MOVIES_BREAKPOINT_1280, increment: MOVIES_INCREMENT_3 },
      { width: MOVIES_BREAKPOINT_1279, increment: MOVIES_INCREMENT_3 },
      { width: MOVIES_BREAKPOINT_1278, increment: MOVIES_INCREMENT_3 },
      { width: MOVIES_BREAKPOINT_1130, increment: MOVIES_INCREMENT_2 },
      { width: MOVIES_BREAKPOINT_766, increment: MOVIES_INCREMENT_2 },
      { width: MOVIES_BREAKPOINT_0, increment: MOVIES_INCREMENT_2 },
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
