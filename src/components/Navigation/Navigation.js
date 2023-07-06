import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

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
            <Link to="/" className="navigation__item">
              Главная
            </Link>
          </li>
        )}
        <li>
          <Link to="/movies" className="navigation__item">
            Фильмы
          </Link>
        </li>

        <li>
          <Link to="/saved-movies" className="navigation__item">
            Сохраненные фильмы
          </Link>
        </li>
      </ul>
      <Link to="/profile" className="navigation__profile" />
    </nav>
  );
}

export default Navigation;
