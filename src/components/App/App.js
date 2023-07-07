import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import Main from "../Main/Main.js";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Profile from "../Profile/Profile.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";

const App = () => {
  const [currentUser] = useState({
    name: "Ryan Gosling",
    email: "barbidriver007@gmail.com",
    isLogged: false, /* Необходимо заменить на true, чтобы проверить работоспособность залогиненного аккаунта(navigation и burger menu) */
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/movies" element={<Movies />} />

            <Route path="/saved-movies" element={<SavedMovies />} />

            <Route path="/signin" element={<Login />} />

            <Route path="/signup" element={<Register />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/notfound" replace />} />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
