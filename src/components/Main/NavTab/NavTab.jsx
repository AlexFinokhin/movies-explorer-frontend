import { Link } from "react-scroll";

const NavTab = () => {
  return (
    <section className="navtab">
      <h1 className="navtab__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <nav>
        <ul className="navtab__list">
          <li>
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="navtab__link"
            >
              О проекте
            </Link>
          </li>
          <li>
            <Link
              to="techs"
              smooth={true}
              duration={500}
              className="navtab__link"
            >
              Технологии
            </Link>
          </li>
          <li>
            <Link
              to="about-me"
              smooth={true}
              duration={500}
              className="navtab__link"
            >
              Студент
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default NavTab;
