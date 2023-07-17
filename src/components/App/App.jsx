import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import mainApi from "../../utils/mainApi";
import authApi from "../../utils/authApi";
import ProtectedRouteElement from "../ProtectedRoutes/ProtectedRouteElement";
import AuthorizedRouteElement from "../ProtectedRoutes/AuthorizedRouteElement";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import failure from "../../images/failure.svg";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipImageSrc, setTooltipImageSrc] = useState("");
  const [tooltipText, setTooltipText] = useState("");
  const navigate = useNavigate();
  const path = window.location.pathname;

  useEffect(() => {
    checkLoggedInStatus();
    // eslint-disable-next-line
  }, []);

  const checkLoggedInStatus = async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoading(true);
      try {
        const res = await mainApi.getUserInfo();
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          localStorage.removeItem("allMovies");
          navigate(path);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        setIsLoading(true);
        try {
          const [profileInfo, moviesData] = await Promise.all([
            mainApi.getUserInfo(),
            mainApi.getSavedMovies(),
          ]);
          setCurrentUser(profileInfo);
          setSavedMovies(moviesData.filter((x) => x.owner === profileInfo._id));
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const handleAuthorization = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await authApi.handleLogIn(email, password);
      if (res) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/movies");
      }
    } catch (err) {
      console.log(err);
      setTooltipImageSrc(failure);
      setTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
      setIsTooltipOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMovie = async (movie) => {
    try {
      const newMovie = await mainApi.saveMovie(movie);
      const updatedSavedMovies = [newMovie, ...savedMovies];
      setSavedMovies(updatedSavedMovies);
    } catch (err) {
      console.error("Error:", err);
      await handleUnauthorized(err);
    }
  };

  const handleDeleteMovie = async (movie) => {
    try {
      await mainApi.deleteMovie({ id: movie._id });
      setSavedMovies((prevSavedMovies) =>
        prevSavedMovies.filter((item) => item._id !== movie._id)
      );
    } catch (err) {
      console.log(err);
      await handleUnauthorized(err);
    }
  };

  const handleUnauthorized = async (err) => {
    if (err === "Error: 401") {
      await handleSignOut();
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("query");
    localStorage.removeItem("shorts");
    localStorage.removeItem("allMovies");
    navigate("/");
  };

  const closeAllPopups = () => {
    setIsTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  component={Movies}
                  savedMovies={savedMovies}
                  isLoggedIn={isLoggedIn}
                  onDelete={handleDeleteMovie}
                  onLike={handleSaveMovie}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  component={SavedMovies}
                  isLoading={isLoading}
                  savedMovies={savedMovies}
                  isLoggedIn={isLoggedIn}
                  onDelete={handleDeleteMovie}
                />
              }
            />

            <Route
              path="/signin"
              element={
                <AuthorizedRouteElement
                  component={Login}
                  isLoggedIn={isLoggedIn}
                  onAuthorization={handleAuthorization}
                  isLoading={isLoading}
                />
              }
            />

            <Route
              path="/signup"
              element={
                <AuthorizedRouteElement
                  component={Register}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  handleAuthorization={handleAuthorization}
                  setTooltipImageSrc={setTooltipImageSrc}
                  setTooltipText={setTooltipText}
                  setIsTooltipOpen={setIsTooltipOpen}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  component={Profile}
                  onSignOut={handleSignOut}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setCurrentUser={setCurrentUser}
                  setTooltipImageSrc={setTooltipImageSrc}
                  setTooltipText={setTooltipText}
                  setIsTooltipOpen={setIsTooltipOpen}
                  handleUnauthorized={handleUnauthorized}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <InfoTooltip
            imageStatus={tooltipImageSrc}
            title={tooltipText}
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
