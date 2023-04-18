import React, {useEffect, useState} from "react";
import "./index.css"
import { Link } from "react-router-dom";

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

    const getPokemonBackgroundColor = (type) => {
      const colorMap = {
        grass: "green",
        fire: "red",
        water: "blue"
      };
      return colorMap[type] || "gray";
    }
    return(
        <div>
            <div className="poke-page" >
                {pokemons.map((pokemon) => (
                    <PokemonInfo key={pokemon.name} pokemon={pokemon.name}/>
                ))}
            </div>
            <button onClick={handlePreviousePage} disabled={currentPage === 1}>Previous Page</button>
            <button onClick={handleNextPage} disabled={pokemons.length < limit}>Next Page</button>
        </div>
    )
}

const PokemonInfo = ({pokemon}) => {
    const [message, setMessage] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("")
    const [img, setImg] = useState("");
  
    const getPokemon = async (pokemon) =>
    {
      if(pokemon === "") return;
  
      try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if(!response.ok) throw new Error("Response was not OK");
        const pkmn = await response.json();
        setImg(pkmn.sprites.front_default);
        setId(pkmn.id);
        setName(pkmn.name);
      
      }
      catch(err)
      {
        setMessage(err.message);
        setId("");
        setImg("");
        setName("")
      }
    }
    useEffect (() => {
      getPokemon(pokemon);
    }, [pokemon])
    return (
        <div className="poke-box">
          <Link to={`about/${id}`} className="poke-box-link">
            <div className="poke-box-inner">
              <div id="message">{message}</div>
              <div className="poke-info">
              <div id="id">{id}</div>
              <div id="name">{name}</div>
              </div>
              <div className="poke-img-container">
              <img src={img} alt="img" className="poke-img"/>
              </div>
            </div> 
          
          </Link>
        </div>
      
      
    )
  }
  export default Page;
