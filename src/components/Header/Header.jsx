import { useState } from "react";
import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

const Header = ({ isLoggedIn }) => {
  const [isBurgerOpen, setIsNavigationOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsNavigationOpen(!isBurgerOpen);
  };

  return (
    <header className="header">
      <Logo />
      {isLoggedIn ? (
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
      )}
    </header>
  );
};

export default Header;
