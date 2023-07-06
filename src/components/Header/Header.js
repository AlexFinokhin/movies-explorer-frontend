import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Navigation from "../Navigation/Navigation.js";
import Logo from "../Logo/Logo";

const Header = ({ style: { default: isDefaultStyle } }) => {
  const { isLogged } = useContext(CurrentUserContext);
  const [isBurgerOpen, setIsNavigationOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsNavigationOpen(!isBurgerOpen);
  };

  return (
    <header className="header">
      <Logo />
      {!isDefaultStyle &&
        (isLogged ? (
          <>
            {isBurgerOpen && (
              <div
                className={`header__background ${
                  isBurgerOpen ? "header__background_active" : ""
                }`}
              />
            )}
            <button
              onClick={handleBurgerClick}
              className="header__menu-button"
              type="button"
            ></button>
            <Navigation
              isNavigationOpen={isBurgerOpen}
              handleBurgerClick={handleBurgerClick}
            />
          </>
        ) : (
          <nav className="header__nav">
            <Link to="/signup" className="header__signup">
              Регистрация
            </Link>
            <Link to="/signin" className="header__signin">
              Войти
            </Link>
          </nav>
        ))}
    </header>
  );
};

export default Header;
