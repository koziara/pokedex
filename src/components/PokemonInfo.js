import React, {useEffect, useState} from "react";
import "../styles/PokemonInfo.css"
import { Link } from "react-router-dom";

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
  export default PokemonInfo;
