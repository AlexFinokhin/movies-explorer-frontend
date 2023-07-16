import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";

const Logo = () => {
  return (
    <NavLink to="/" className="logo">
      <img src={logo} className="logo__image" alt="Логотип сайта" />
    </NavLink>
  );
};

export default Logo;
