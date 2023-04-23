import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"

const Navbar = () =>
{
    return (
        <nav>
            <h1>Pokedex</h1>
            <ul>
            <li>
                <Link to="/">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/info">
                    Info
                </Link>
            </li>
            </ul> 
        </nav>

    )
}

export default Navbar;