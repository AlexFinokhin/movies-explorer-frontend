import { NavLink } from "react-router-dom";

function Navigation({ isNavigationOpen, handleBurgerClick }) {
  return (
    <nav className={`navigation ${isNavigationOpen ? "navigation_open" : ""}`}>
      <button
        onClick={handleBurgerClick}
        className="navigation__close"
        type="button"
      ></button>

      <ul className={`navigation__list ${isNavigationOpen ? "" : ""}`}>
        {isNavigationOpen && (
          <li>
            <NavLink to="/" className="navigation__item">
              Главная
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/movies" className="navigation__item">
            Фильмы
          </NavLink>
        </li>

        <li>
          <NavLink to="/saved-movies" className="navigation__item">
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
      <NavLink to="/profile" className="navigation__profile" />
    </nav>
  );
}

export default Navigation;
