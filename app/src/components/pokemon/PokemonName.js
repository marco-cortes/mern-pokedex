import React from "react";

export const PokemonName = ( { name, types} ) =>{
    return(
        <div className="pokemonName">
            <div className="pokemon-title">
                {name}
            </div>
            <div className="pokemon-type">
                <p>Type(s):</p>
                {
                    types && types.length > 0 &&
                    types.map(type => (
                        <p>{type}</p>
                    ))
                }
            </div>
        </div>
    )
}