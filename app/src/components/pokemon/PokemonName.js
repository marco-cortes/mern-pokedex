import { icons } from "../../helpers/pokemonTypes"

export const PokemonName = ({ name, types }) => {
    return (
        <div className="pokemonName">
            <div className="pokemon-title">
                {name}
            </div>
            <p className="pokemon-type-p">Type(s):</p>
            <div className="pokemon-type">
                {
                    types && types.length > 0 &&
                    types.map((type, index) => (
                        <div className={"poke-type " + type.toLowerCase()} key={index}>
                            <span>{type}</span>
                            <img src={icons("./Icon_" + type.toLowerCase() + ".webp")} className="type-img" alt={type} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}