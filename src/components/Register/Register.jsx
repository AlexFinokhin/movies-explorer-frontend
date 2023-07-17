import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { INPUT_ERROR_NAME } from "../../utils/constants";
import useFormValidation from "../../hooks/useFormValidation";
import { EMAIL_PATTERN } from "../../utils/constants";
import authApi from "../../utils/authApi";
import failure from "../../images/failure.svg";

const Register = ({
  isLoading,
  setIsTooltipOpen,
  setTooltipText,
  setTooltipImageSrc,
  handleAuthorization,
}) => {
  const { values, errors, isInputValid, handleChange } = useFormValidation();

  const handleRegister = async (name, email, password) => {
    try {
      await authApi.handleRegistration(name, email, password);
      handleAuthorization(email, password);
    } catch (err) {
      setTooltipImageSrc(failure);
      setTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
      setIsTooltipOpen(true);
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;

    handleRegister(name, email, password);
  };

  return (
    <main className="main">
      <section className="register">
        <Logo />
        <h2 className="register__title">Добро пожаловать!</h2>
        <form
          className="register__form"
          id="register-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="register__input-container">
            <label className="register__input-label">Имя</label>
            <input
              className={`register__input ${
                errors.name ? "register__input_errored" : ""
              }`}
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              value={values.name || ""}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <span className="register__error">{errors.name}</span>
            )}
          </div>

          <div className="register__input-container">
            <label className="register__input-label">E-mail</label>
            <input
              className={`register__input ${
                errors.email ? "register__input_errored" : ""
              }`}
              type="email"
              name="email"
              id="email"
              minLength="5"
              maxLength="30"
              autoComplete="off"
              placeholder="Email"
              value={values.email || ""}
              pattern={EMAIL_PATTERN}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="register__error">{errors.email}</span>
            )}
          </div>

          <div className="register__input-container">
            <label className="register__input-label">Пароль</label>
            <input
              className={`register__input ${
                errors.password ? "register__input_errored" : ""
              }`}
              type="password"
              name="password"
              id="password"
              minLength="8"
              maxLength="30"
              placeholder="Пароль"
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$" // сделать конст
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
          <div className="register__button-container">
            <button
              type="submit"
              className="register__submit-button"
              disabled={isLoading || !isInputValid ? true : false}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
        <div className="register__switch">
          <p className="register__switch-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__switch-link">
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Register;
