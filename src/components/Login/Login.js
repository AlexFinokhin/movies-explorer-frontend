import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const Login = () => {
  return (
    <main className="main">
      <section className="login">
        <Logo />
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form">
          <div className="login__input-container">
            <label className="login__input-label">E-mail</label>
            <input
              className="login__input"
              type="email"
              name="email"
              id="email"
              minLength="5"
              maxLength="30"
              placeholder="Email"
              autoComplete="off"
              required
            />
          </div>

          <div className="login__input-container">
            <label className="login__input-label">Пароль</label>
            <input
              className="login__input"
              type="password"
              name="password"
              id="password"
              minLength="6"
              maxLength="30"
              placeholder="Пароль"
              autoComplete="off"
              required
            />
          </div>
          <div className="login__button-container">
            <button type="submit" className="login__submit-button">
              Войти
            </button>
          </div>
        </form>
        <div className="login__switch">
          <p className="login__switch-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__switch-link">
            Регистрация
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
