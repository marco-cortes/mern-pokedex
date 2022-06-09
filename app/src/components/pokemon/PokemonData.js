import React from "react";

export const PokemonData = ( {abilities, height, weight} ) => {
    return(
        <div className="pokemon-data">
            <p className="pokeAbilities">Abilities:</p> {
                abilities && abilities.length  > 0 &&
                abilities.map(ability => (
                    <p>{ability}</p>
                ))
            }
            <p className="pokeHeight">Height: {height}</p>
            <p className="pokeWeight">Weight: {weight}</p>
        </div>
    )
}