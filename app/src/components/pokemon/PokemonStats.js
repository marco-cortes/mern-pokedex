import React from "react";

export const PokemonStats = ({stats}) =>{
    return(
        <div className="pokemon-stats">
            <p className="statsTitle">Stats</p>
            <p>Attack: {stats.attack}</p>
            <p>Defense: {stats.defense}</p>
            <p>HP: {stats.hp}</p>
            <p>Special Attack: {stats.specialAttack}</p>
            <p>Special Defense: {stats.specialDefense}</p>
            <p>Speed: {stats.speed}</p>
        </div>
    )
}