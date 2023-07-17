import { useState, useEffect } from "react";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

const SearchForm = (props) => {
  const { onSearch, onCheckbox, isShortMovies } = props;
  const [query, setQuery] = useState("");
  const [isQueryError, setIsQueryError] = useState(false);
  const path = window.location.pathname;

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      setIsQueryError(false);
      return onSearch(query);
    }

    setIsQueryError(true);
  };

  useEffect(() => {
    if (path === "/movies") {
      const localQuery = localStorage.getItem("query");
      setQuery(localQuery ?? "");
    }
  }, [path]);

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__icon"></div>
        <fieldset className="search__container">
          <input
            formNoValidate
            name="query"
            value={query}
            onChange={handleQueryChange}
            className="search__input"
            type="text"
            placeholder="Фильм"
            autoComplete="off"
          />
          <button className="search__submit" type="submit" aria-label="Поиск" />
        </fieldset>
        <div className="search__line"></div>
        <FilterCheckbox onCheckbox={onCheckbox} isShortMovies={isShortMovies} />
      </form>
      {isQueryError && (
        <span className="search__error">Нужно ввести ключевое слово</span>
      )}
    </section>
  );
};

export default SearchForm;
