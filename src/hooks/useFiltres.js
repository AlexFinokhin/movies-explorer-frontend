import { SHORT_MOVIE } from "../utils/constants";

export const filterByMovies = (movies, query) => {
  if (!Array.isArray(movies)) {
    return []; 
  }

  const moviesByQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userQuery = query.toLowerCase().trim();
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    );
  });

  return moviesByQuery;
};

export const filterByDuration = (movies) => {
  return movies.filter(({ duration }) => duration < SHORT_MOVIE);
};

export const convertByDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const hoursText = formatNumberWithWord(hours, "час", "часа", "часов");
  const minutesText = formatNumberWithWord(
    minutes,
    "минута",
    "минуты",
    "минут"
  );

  return `${hoursText} ${minutesText}`.trim();
};

const formatNumberWithWord = (number, form1, form2, form5) => {
  const lastDigit = number % 10;
  const secondToLastDigit = Math.floor((number % 100) / 10);

  if (secondToLastDigit === 1) {
    return `${number} ${form5}`;
  }
  if (lastDigit === 1) {
    return `${number} ${form1}`;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${number} ${form2}`;
  }
  return `${number} ${form5}`;
};
