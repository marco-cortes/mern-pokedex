import { Card } from "./Card";

export const CardList = ({ pokemons }) => {

    if (!pokemons) return <h1>Loading...</h1>;

    return (
        <div className="pokemon-list">
            {
                pokemons.map(pokemon => (
                    <Card key={pokemon._id} pokemon={pokemon} />
                ))
            }
        </div>
    )
}
