import { NOT_FOUND_MOVIES } from "../../../utils/constants";

const NotFoundMessage = () => {
  return (
    <>
      <p className="movies-card__not-found">{NOT_FOUND_MOVIES}</p>
    </>
  );
};

export default NotFoundMessage;
