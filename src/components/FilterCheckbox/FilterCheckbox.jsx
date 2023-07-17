const FilterCheckbox = ({ onCheckbox, isShortMovies }) => {
  const handleCheckboxClick = () => {
    onCheckbox();
  };

  return (
    <label className="checkbox">
      <input
        className="checkbox__toggle"
        type="checkbox"
        checked={isShortMovies}
        onChange={handleCheckboxClick}

      />
      <span className="checkbox__toggle-switch" ></span>
      <span className="checkbox__toggle-label">
        Короткометражки
      </span>
    </label>
  );
};

export default FilterCheckbox;
