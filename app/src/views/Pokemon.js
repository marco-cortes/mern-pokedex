import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { getAllPokemon } from "../redux/actions/pokemon";
import { PokemonContainer } from "../components/pokemon/PokemonContainer";
import Loading from "../components/ui/Loading";

export const Pokemon = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { pokemon, loading } = useSelector(state => state.pokemon);

    useEffect(() => {
        dispatch(getAllPokemon(id));
    }, [dispatch, id]);

    if (loading)
        return <div className="loading"><Loading /></div>

    return (
        <div className="container">
            <Header />
            { <PokemonContainer pokemon={pokemon}/>}
        </div>
    )
}
