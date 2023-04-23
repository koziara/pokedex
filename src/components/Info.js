import React from "react";
import "../styles/Info.css";
import Navbar from "./Navbar";

const Info = () =>
{
    return (
        <div>
            <div className="info-page">
            <div className="info-page-text">
                <h1>About this Pokedex</h1>
                <p>A Pokédex is a catalog of Pokémon, that a trainer can browse to get detailed information about any Pokémon.
                It is a React application which retrieves data from PokedexAPI. Pokemons are shown on the main page with basic information. After clicking on the specific pokemon the additional data is shown. 
                </p>
            </div>
        </div>
        </div>

    )
}

export default Info;