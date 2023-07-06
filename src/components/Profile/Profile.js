import { useContext, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";

const Profile = () => {
  const { name, email } = useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState(name);
  const [profileEmail, setProfileEmail] = useState(email);
  const navigate = useNavigate();

  const handleToggleEditing = () => {
    setIsEditing(true);
  };

  const submitProfile = (event) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const handleNameChange = (event) => {
    setProfileName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setProfileEmail(event.target.value);
  };

  const handleLogOut = () => {
    setIsEditing(false);
    navigate("/signin");
  };

  return (
    <>
      <Header style={{ default: false }} />
      <main className="main">
        <section className="profile">
          <h2 className="profile__title">{`Привет, ${name}!`}</h2>
          <form className="profile__container">
            <label className="profile__info">
              <span className="profile__span">Имя</span>
              <input
                type="text"
                name="name"
                id="name"
                className="profile__input"
                placeholder="Укажите имя"
                value={profileName}
                onChange={handleNameChange}
                minLength="6"
                maxLength="30"
                disabled={!isEditing}
                autoComplete="off"
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
                className="profile__input"
                placeholder="Укажите почту"
                value={profileEmail}
                onChange={handleEmailChange}
                disabled={!isEditing}
                autoComplete="off"
                required
              />
            </label>
          </form>
          {isEditing ? (
            <button
              type="submit"
              className="profile__submit"
              onClick={submitProfile}
            >
              Сохранить
            </button>
          ) : (
            <div className="profile__button-container">
              <button
                type="submit"
                className="profile__button-edit"
                onClick={handleToggleEditing}
              >
                Редактировать
              </button>
              <button className="profile__button-exit" onClick={handleLogOut}>
                Выйти из аккаунта
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Profile;
