import { useSelector } from "react-redux";
import Loading from "../../views/Loading";
import { Card } from "./Card";

export const CardList = ({ pokemons }) => {

    const { loading } = useSelector(state => state.pokemon);

    if (loading) return <div style={{
        height: "60vh",
    }}><Loading /></div>;

    return (
        <div className="pokemon-list  animate__animated animate__fadeIn">
            {
                pokemons.map(pokemon => (
                    <Card key={pokemon._id} pokemon={pokemon} />
                ))
            }
        </div>
    )
}
