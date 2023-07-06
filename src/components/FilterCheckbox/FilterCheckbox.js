const FilterCheckbox = () => {
  return (
    <label className="checkbox">
      <input className="checkbox__toggle" type="checkbox" />
      <span className="checkbox__toggle-switch"></span>
      <span className="checkbox__toggle-label">Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
