import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import Header from "../Header/Header";
import useFormValidation from "../../hooks/useFormValidation.js";
import { EMAIL_PATTERN } from "../../utils/constants.js";
import mainApi from "../../utils/mainApi.js";

import success from "../../images/success.svg";
import failure from "../../images/failure.svg";

const Profile = ({
  onSignOut,
  isLoggedIn,
  isLoading,
  setIsLoading,
  setCurrentUser,
  setTooltipImageSrc,
  setTooltipText,
  setIsTooltipOpen,
  handleUnauthorized,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, handleChange, isInputValid, resetForm } =
    useFormValidation();

  const [isEditing, setIsEditing] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (
      currentUser &&
      (values.name !== currentUser.name || values.email !== currentUser.email)
    ) {
      setIsDataChanged(true);
    } else {
      setIsDataChanged(false);
    }
  }, [currentUser, values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateUser({
        name: values.name,
        email: values.email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleEditing = () => {
    setIsEditing(true);
  };

  const handleUpdateUser = async (newUserInfo) => {
    try {
      setIsLoading(true);
      const data = await mainApi.setUserInfo(newUserInfo);
      setCurrentUser(data);
      setIsEditing(false);
      setIsLoading(false);
      setTooltipImageSrc(success);
      setTooltipText("Данные профиля успешно изменены!");
      setIsTooltipOpen(true);
    } catch (err) {
      console.log(err);
      handleUnauthorized(err);
      setIsLoading(false);
      setTooltipImageSrc(failure);
      setTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
      setIsTooltipOpen(true);
    }
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="main">
        <section className="profile">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <form
            className="profile__container"
            onSubmit={handleSubmit}
            noValidate
          >
            <label className="profile__info">
              <span className="profile__span">Имя</span>
              <input
                type="text"
                name="name"
                id="name-input"
                className={`profile__input ${
                  errors.name ? "profile__input_errored" : ""
                }`}
                placeholder="Укажите имя"
                minLength="2"
                maxLength="30"
                autoComplete="off"
                onChange={handleChange}
                value={values.name || ""}
                disabled={!isEditing}
                required
              />
            </label>
            <div className="profile__line" />
            <label className="profile__info">
              <span className="profile__span">E-mail</span>
              <input
                type="email"
                name="email"
                id="email"
                minLength="6"
                maxLength="30"
                className={`profile__input ${
                  errors.email ? "profile__input_errored" : ""
                }`}
                placeholder="Укажите почту"
                autoComplete="off"
                pattern={EMAIL_PATTERN}
                value={values.email || ""}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </label>
            <span className="profile__error">{errors.name}</span>
            <span className="profile__error">{errors.email}</span>

            {isEditing ? (
              <button
                type="submit"
                disabled={isLoading || !isInputValid || !isDataChanged}
                className={`profile__submit ${
                  !isDataChanged ? "profile__submit_not-changed" : ""
                }`}
              >
                Сохранить
              </button>
            ) : (
              <div className="profile__button-container">
                <button
                  type="button"
                  className="profile__button-edit"
                  onClick={handleToggleEditing}
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  className="profile__button-exit"
                  onClick={onSignOut}
                >
                  Выйти из аккаунта
                </button>
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
};

export default Profile;
