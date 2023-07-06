import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { apiPreloader } from "../../utils/apiPreloader";
import Preloader from "../Preloader/Preloader";
import { cardListSave } from "../../utils/moviesArray";

const SavedMovies = () => {
  const { isLogged } = useContext(CurrentUserContext);
  const [saveCards, setCards] = useState([]);
  const [isLoadind, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLogged) {
      setCards(cardListSave);
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
          <MoviesCardList
            cardList={saveCards}
            cardButtonStyle={{ save: false }}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
