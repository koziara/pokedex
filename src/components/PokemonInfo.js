import React, {useEffect, useState} from "react";
import "../styles/PokemonInfo.css"
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

const PokemonInfo = ({pokemon}) => {
    const [message, setMessage] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("")
    const [img, setImg] = useState("");
    const [types, setTypes] = useState([]);

    const getPokemon = async (pokemon) =>
    {
      if(pokemon === "") return;
  
      try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if(!response.ok) throw new Error("Response was not OK");
        const pkmn = await response.json();
        setImg(pkmn.sprites.other.dream_world.front_default);
        setId(pkmn.id);
        setName(pkmn.name);
        setTypes(pkmn.types);
      }
      catch(err)
      {
        setMessage(err.message);
        setId("");
        setImg("");
        setName("");
        setTypes([]);
      }
    }
    useEffect (() => {
      getPokemon(pokemon);
    }, [pokemon])


    const getType = () => {
      if (!types || types.length === 0) return "";
      const typeName = types[0].type.name;
      return typeName;
    };
    
    return (
        <div className={`poke-box ${getType()}`}>
          <Link to={`about/${id}`} className="poke-box-link">
            <div className="poke-box-inner">
              <div id="message">{message}</div>
              <div className="poke-info">
                <p id="id">{id}</p>
                <p id="name">{name}</p>
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
