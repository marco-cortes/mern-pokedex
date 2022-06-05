import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { startLogout } from "../../redux/actions/auth";
import { useState } from "react";

export const Header = () => {

    const [icon, setIcon] = useState("fa-bars");
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(startLogout());
    }

    const linkActive = (isActive) => {
        return "link " + (isActive ? "link-active" : "");
    }

    const showMenu = () => {
        setIcon(icon === "fa-bars" ? "fa-times" : "fa-bars");
        document.getElementById("menu").classList.toggle("menu-active");
    }

    return (
        <div className="header">
            <Link className="header-logo" to={"/"}>
                <img src={logo} alt="logo" className="logo" />
                <h1 className="logo-text">Pokédex</h1>
            </Link>
            <div className="header-menu" id="menu">
                <NavLink className={({ isActive }) => linkActive(isActive)} to={"/"}>Home</NavLink>
                {
                    user ?
                        <>
                            <NavLink className={({ isActive }) => linkActive(isActive)} to={"/my-pokemons"}>My Pokemons</NavLink>
                            <NavLink className={({ isActive }) => linkActive(isActive)} to={"/new-pokemon"}>New Pokemon</NavLink>
                            <NavLink className={({ isActive }) => linkActive(isActive)} to={"/profile"}>Profile</NavLink>
                            <button className="btn-logout" onClick={logout} >Log Out</button>
                        </> : ""
                }
            </div>
            <button className="menu-icon" onClick={showMenu}>
                <i className={"fas " + icon}></i>
            </button>
        </div>
    )
}
