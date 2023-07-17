import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import { filterByMovies, filterByDuration } from "../../hooks/useFiltres";

const SavedMovies = ({ isLoggedIn, savedMovies, onDelete, isLoading }) => {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  const handleShortMovies = () => {
    setIsShortMovies(!isShortMovies);
  };

  useEffect(() => {
    const handleFilteredMoviesUpdate = (moviesList) => {
      const updatedMoviesList = isShortMovies
        ? filterByDuration(moviesList)
        : moviesList;
      setFilteredMovies(updatedMoviesList);
      setIsNotFound(updatedMoviesList.length === 0);
    };

    const moviesList = filterByMovies(savedMovies, searchQuery);
    handleFilteredMoviesUpdate(moviesList);
  }, [savedMovies, isShortMovies, searchQuery]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="main">
        <SearchForm
          onSearch={onSearch}
          onCheckbox={handleShortMovies}
          isShortMovies={isShortMovies}
        />

        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            isNotFound={isNotFound}
            isSavedMovies={true}
            cards={filteredMovies}
            savedMovies={savedMovies}
            onDelete={onDelete}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
