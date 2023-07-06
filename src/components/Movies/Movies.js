import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header.js";
import SearchForm from "../Movies/SearchForm/SearchForm.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";
import { apiPreloader } from "../../utils/apiPreloader.js";
import Preloader from "../../components/Preloader/Preloader.js";
import { cardList } from "../../utils/moviesArray.js";

const Movies = () => {
  const { isLogged } = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);
  const [isLoadind, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLogged) {
      setCards(cardList);
    }
  }, [isLogged]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await apiPreloader();
        console.log(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // можно закомментить для провери работоспособности прелоадера
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header style={{ default: false }} />
      <main className="main">
        <SearchForm />
        {isLoadind ? (
          <Preloader />
        ) : (
          <MoviesCardList cardButtonStyle={{ save: true }} cardList={cards} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movies;
