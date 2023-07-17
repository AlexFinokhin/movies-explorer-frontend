import { MOVIE_URL } from "./constants.js";

export class MovieService {
  async getMovies() {
    try {
      const response = await fetch(`${MOVIE_URL}/beatfilm-movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Ошибка при получении фильмов: ${error.message}`);
    }
  }
}
