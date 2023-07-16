export const MOVIE_URL = "https://api.nomoreparties.co";
export const BASE_URL = "https://api.ryangosling.nomoredomains.rocks";

export const PASSW0RD_PATTERN = "^(?=.*[A-Za-z])(?=.*d)(?=.*[!@#$%^&*]).{8,}$";
export const EMAIL_PATTERN = "[a-z0-9]+@[a-z]+.[a-z]{2,5}";

export const INPUT_ERROR_NAME = {
  password:
    "Некорректный пароль. Пароль должен содержать букву, цифру, специальный символ и быть не менее 8 символов длиной.",
  searchMovies: "Нужно ввести ключевое слово",
};

export const SHORT_MOVIE = 40;
export const MOVIES_COUNT_12 = 12;
export const MOVIES_COUNT_8 = 8;
export const MOVIES_COUNT_5 = 5;
export const MOVIES_INCREMENT_3 = 3;
export const MOVIES_INCREMENT_2 = 2;

export const NOT_FOUND_MOVIES = "Фильмы не найдены";
export const ERROR_MESSAGE =
  " Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного ипопробуйте ещё раз.";
