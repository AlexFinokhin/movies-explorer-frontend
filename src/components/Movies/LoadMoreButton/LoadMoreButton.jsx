const LoadMoreButton = ({ onClick }) => {
  return (
    <button className="movies-card__button" type="button" onClick={onClick}>
      Ещё
    </button>
  );
};

export default LoadMoreButton;
