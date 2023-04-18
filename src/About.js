import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const About = () =>
{
    const {pokemonId} = useParams();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [img, setImg] = useState("");

    const getDetails = async (pokemon) =>
    {
        if(pokemon == "") return;

        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            if(!response.ok) throw new Error("Response was not OK");
            const data = await response.json();
            setImg(data.sprites.front_default);
            setId(data.id);
            setName(data.name);
        }
        catch(err)
        {
            setId("");
            setImg("");
            setName("");
        }
    }

    useEffect(() => {
        getDetails(pokemonId);
    }, [pokemonId])
    return (
        <div className="about">
            <div id="id">{id}</div>
            <div id="name">{name}</div>
            <img src={img}/>
        </div>
    )
}

export default About;