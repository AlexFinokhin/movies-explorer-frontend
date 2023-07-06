import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="main">
      <section className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <button
          type="button"
          onClick={handleGoBack}
          className="not-found__back"
        >
          Назад
        </button>
      </section>
    </main>
  );
};

export default NotFound;
