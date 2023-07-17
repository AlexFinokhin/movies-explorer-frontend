const AboutProject = () => {
  return (
    <section id="about" className="about">
      <h2 className="about__name">О проекте</h2>
      <ul className="about__list">
        <li>
          <h3 className="about__title">Дипломный проект включал 5 этапов</h3>
          <p className="about__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="about__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <figure className="about__container">
        <h4 className="about__timeline">1 неделя</h4>
        <h4 className="about__timeline about__timeline-gray">4 недели</h4>
        <span className="about__timeline-text">Back-end</span>
        <span className="about__timeline-text">Front-end</span>
      </figure>
    </section>
  );
};

export default AboutProject;
