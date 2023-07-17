import Photo from "../../../images/Photo.jpg";

const AboutMe = () => {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__name">Студент</h2>
      <article className="about-me__container">
        <img
          className="about-me__photo"
          alt="Фото Райана Гослинга"
          src={Photo}
        />
        <div className="about-me__column">
          <h3 className="about-me__title">Райан</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 42 года</p>
          <p className="about-me__text">
            Родился в канаде. Являюсь актером, музыкантом, кинорежиссером и с
            недавних пор еще и фронтенд-разработчик. Стал одним из самых
            востребованных исполнителей главной роли Голливуда. Благодаря своей
            очаровательной внешности и актерскому таланту, смог покорить сердца
            зрителей по всему миру, что сделала меня одной из самых узнаваемых и
            популярных знаменитостей в мире.
          </p>
          <a
            href="https://github.com/AlexFinokhin"
            target="_blank"
            rel="noopener noreferrer"
            className="about-me__link"
          >
            Github
          </a>
        </div>
      </article>
    </section>
  );
};

export default AboutMe;
