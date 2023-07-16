import { useNavigate, NavLink } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-3);
  };

  return (
    <main className="main">
      <section className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <NavLink to="#" className="not-found__back" onClick={handleGoBack}>
          Назад
        </NavLink>
      </section>
    </main>
  );
};

export default NotFound;
