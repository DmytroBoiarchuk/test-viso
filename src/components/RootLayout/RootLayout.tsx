import {Outlet} from "react-router";
import NavBar from "../NavBar/NavBar.tsx";

const RootLayout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default RootLayout;
