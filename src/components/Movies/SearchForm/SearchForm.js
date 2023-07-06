import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__icon"></div>
        <fieldset className="search__container">
          <input
            className="search__input"
            type="text"
            required
            placeholder="Фильм"
          />
          <button className="search__submit" type="submit" />
        </fieldset>
        <div className="search__line"></div>
        <FilterCheckbox />
      </form>
    </section>
  );
};

export default SearchForm;
