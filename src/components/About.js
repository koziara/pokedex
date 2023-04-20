import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/About.css"
import "../styles/BackgroundColor.css"



const About = () =>
{
    const {pokemonId} = useParams();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [baseExperience, setBaseExperience] = useState("");
    const [types, setTypes] = useState([]);

    const getDetails = async (pokemon) =>
    {
        if(pokemon == "") return;

        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            if(!response.ok) throw new Error("Response was not OK");
            const data = await response.json();
            setImg(data.sprites.other.dream_world.front_default);
            setId(data.id);
            setName(data.name);
            setHeight(data.height);
            setWeight(data.weight);
            setBaseExperience(data.base_experience);
            setTypes(data.types);
        }
        catch(err)
        {
            setId("");
            setImg("");
            setName("");
            setHeight("");
            setWeight("");
            setBaseExperience("");
            setTypes([]);
        }
    }

    useEffect(() => {
        getDetails(pokemonId);
    }, [pokemonId])

    const getType = () => {
        if (!types || types.length === 0) return "";
        const typeName = types[0].type.name;
        return typeName;
      };
      

    return (
        <div className="about">
            <div className={`about-box ${getType()}`}>
                <div className="about-img">
                    <img src={img}/>
                </div>
                <div className="about-info">
                    <div className="about-info-text">
                        <p id="id">Id: </p><p>{id}</p>
                    </div>
                    <div className="about-info-text">
                        <p id="name">Name: </p><p>{name}</p>
                    </div>
                    <div className="about-info-text">
                        <p id="name">Height: </p><p>{height}</p>
                    </div>
                    <div className="about-info-text">
                        <p id="name">Weight: </p><p>{weight}</p>
                    </div>
                    <div className="about-info-text">
                        <p id="name">Base experience: </p><p>{baseExperience}</p>
                    </div>
                    <div className="about-info-text">
                        {types.map((type) => (
                            <p key={type.type.name} type={type.type.name}>
                                {type.type.name}
                            </p>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default About;