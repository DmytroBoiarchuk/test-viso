import classes from './NavBar.module.scss';
import Logo from "./components/Logo/Logo.tsx";
import SearchInput from "./components/SearchInput/SearchInput.tsx";
import NavMenu from "./components/NavMenu/NavMenu.tsx";

const NavBar = () => {
    return (
        <nav className={classes.navBar}>
            <Logo/>
            <SearchInput/>
            <NavMenu/>
        </nav>
    );
};

export default NavBar;
