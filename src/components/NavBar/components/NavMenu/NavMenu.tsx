import {Link} from "react-router";
import { PiShoppingCartSimpleThin } from "react-icons/pi";

import classes from "./NavMenu.module.scss";
const NavMenu = () => {
    return (
        <menu className={classes.menu}>
            <Link to="/saved"><PiShoppingCartSimpleThin size={50}/></Link>
        </menu>
    );
};

export default NavMenu;
