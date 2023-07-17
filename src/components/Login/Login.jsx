import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { INPUT_ERROR_NAME } from "../../utils/constants";
import useFormValidation from "../../hooks/useFormValidation";
import { EMAIL_PATTERN } from "../../utils/constants";

const Login = ({ isLoading, onAuthorization }) => {
  const { values, errors, isInputValid, handleChange } = useFormValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onAuthorization(values.email, values.password);
  };

  return (
    <main className="main">
      <section className="login">
        <Logo />
        <h2 className="login__title">Рады видеть!</h2>
        <form
          className="login__form"
          id="login-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="login__input-container">
            <label className="login__input-label">E-mail</label>
            <input
              className={`login__input ${
                errors.email ? "login__input_errored" : ""
              }`}
              type="email"
              name="email"
              id="email"
              minLength="5"
              maxLength="30"
              placeholder="Email"
              autoComplete="off"
              value={values.email || ""}
              onChange={handleChange}
              pattern={EMAIL_PATTERN}
              required
            />
            {errors.email && (
              <span className="login__error">{errors.email}</span>
            )}
          </div>

          <div className="login__input-container">
            <label className="login__input-label">Пароль</label>
            <input
              className={`login__input ${
                errors.password ? "login__input_errored" : ""
              }`}
              type="password"
              name="password"
              id="password"
              minLength="8"
              maxLength="30"
              placeholder="Пароль"
              autoComplete="off"
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
              value={values.password || ""}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className="register__error">
                {INPUT_ERROR_NAME.password}
              </span>
            )}
          </div>
          <div className="login__button-container">
            <button
              type="submit"
              className="login__submit-button"
              disabled={!isInputValid || isLoading}
            >
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
