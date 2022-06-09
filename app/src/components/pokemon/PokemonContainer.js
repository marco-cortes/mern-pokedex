import { PokemonData } from "./PokemonData";
import { PokemonStats } from "./PokemonStats";
import { PokemonName } from "./PokemonName";
import { PokemonSlider } from "./PokemonSlider";

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
        </div>
    );
}