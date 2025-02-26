import classes from "./Logo.module.scss";
import logo from "../../../../assets/logo.png";
import {Link} from "react-router";

const Logo = () => {
  return (
    <Link to={'/'} className={classes.logo}>
      <img  src={logo} alt="logo" />
      <h1> Recipe Wold </h1>
    </Link>
  );
};

export default Logo;
