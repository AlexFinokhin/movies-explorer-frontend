import { useEffect, useState, useCallback } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { MovieService } from "../../utils/moviesApi";
import { filterByMovies, filterByDuration } from "../../hooks/useFiltres";

const Movies = ({ isLoggedIn, savedMovies, onDelete, onLike }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const handleFilterMovies = useCallback(async (movies, query, short) => {
    try {
      const moviesList = filterByMovies(movies, query, short);
      setInitialMovies(moviesList);
      setFilteredMovies(short ? filterByDuration(moviesList) : moviesList);
      localStorage.setItem("movies", JSON.stringify(moviesList));
      localStorage.setItem("allMovies", JSON.stringify(movies));
      localStorage.setItem("shorts", JSON.stringify(short));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleLike = (movieId) => {
    onLike(movieId);
  };

  const onSearch = useCallback(
    async (query) => {
      localStorage.setItem("query", query);
      localStorage.setItem("shorts", isShortMovies);

      try {
        setIsLoading(true);
        const movieService = new MovieService();
        const cardsData = await movieService.getMovies();
        await handleFilterMovies(cardsData, query, isShortMovies);
        setIsRequestError(false);
      } catch (err) {
        setIsRequestError(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [handleFilterMovies, isShortMovies]
  );

  const handleShortMovies = () => {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      setFilteredMovies(filterByDuration(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem("shorts", !isShortMovies);
  };

  useEffect(() => {
    setIsShortMovies(localStorage.getItem("shorts") === "true");
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialMovies(movies);
      setFilteredMovies(
        localStorage.getItem("shorts") === "true"
          ? filterByDuration(movies)
          : movies
      );
    }
  }, []);

  useEffect(() => {
    setIsNotFound(filteredMovies.length === 0 && localStorage.getItem("query"));
  }, [filteredMovies]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="main">
        <SearchForm
          onSearch={onSearch}
          onCheckbox={handleShortMovies}
          isShortMovies={isShortMovies}
        />

        <MoviesCardList
          savedMovies={savedMovies}
          cards={filteredMovies}
          isSavedMovies={false}
          isLoading={isLoading}
          isRequestError={isRequestError}
          isNotFound={isNotFound}
          onLike={handleLike}
          onDelete={onDelete}
        />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
