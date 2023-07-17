import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="main">
      <section className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <NavLink to="/movies" className="not-found__back">
          Назад
        </NavLink>
      </section>
    </main>
  );
};

export default NotFound;
