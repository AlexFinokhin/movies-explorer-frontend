import {ERROR_MESSAGE} from "../../utils/constants";

const ErrorMessage = ({ message }) => {
  return (
    <div>
      <p className="movies-card__server-error">{ERROR_MESSAGE}</p>
    </div>
  );
};

export default ErrorMessage;
