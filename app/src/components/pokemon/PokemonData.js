
export const PokemonData = ({ abilities, height, weight }) => {
    return (
        <div className="pokemon-data">
            <div className="poke-info">
                <p className="pokeHeight">Height <br /> <span>{height} m</span></p>
                <p className="pokeWeight">Weight: <br /> <span>{weight} kg</span></p>
            </div>

            <p className="pokeAbilities">Abilities:</p> {
                abilities && abilities.length > 0 &&
                <div className="poke-abilities-container">
                    {
                        abilities.map((ability, index) => (
                            <p className="poke-ability" key={index}>{ability}</p>
                        ))
                    }
                </div>
            }
        </div>
    )
}