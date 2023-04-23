import React, {useEffect, useState} from "react";
import "../styles/PokemonInfo.css"
import { Link } from "react-router-dom";
import PokemonInfo from "./PokemonInfo.js"

const Page = () => 
{
    const [pokemons, setPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [message, setMessage] = useState("");

    const limit = 20;
    const offset = (currentPage -1) *limit;

    useEffect(() => 
    {
        const fetchPokemons = async () =>
        {
          try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            if(!response.ok) throw new Error("Response was not OK");
            const pkmn = await response.json();
            setPokemons(pkmn.results);
            setMessage("");
          }
          catch(err)
          {
            setPokemons([]);
            setMessage(err.message);
          }
        };
        fetchPokemons();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePreviousePage = () =>
    {
        setCurrentPage(currentPage - 1);
    }

    return(
        <div>
            <div className="poke-page" >
                {pokemons.map((pokemon) => (
                    <PokemonInfo key={pokemon.name} pokemon={pokemon.name}/>
                ))}
            </div>
            <div className="page-buttons">
            <button onClick={handlePreviousePage} disabled={currentPage === 1} className="button">Previous Page</button>
            <button onClick={handleNextPage} disabled={pokemons.length < limit} className="button">Next Page</button>
            </div>
        </div>
    )
}
export default Page;