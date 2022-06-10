import { PokemonData } from "./PokemonData";
import { PokemonStats } from "./PokemonStats";
import { PokemonName } from "./PokemonName";
import { PokemonSlider } from "./PokemonSlider";
import { PokemonUser } from "./PokemonUser";

export const PokemonContainer = ({ pokemon }) => {
    return (
        <div className="pokemon-container">
            <PokemonSlider
                images={pokemon.images} />
            <div className="pokeInfo">
                <PokemonName
                    name={pokemon.name}
                    types={pokemon.types} />
                <PokemonData
                    abilities={pokemon.abilities}
                    weight={pokemon.weight}
                    height={pokemon.height} />
                <PokemonStats
                    stats={pokemon.stats} />
            </div>
            <PokemonUser 
                name={pokemon.user.name}
                lastName={pokemon.user.lastName}
                photo={pokemon.user.photo}/>
        </div>
    );
}