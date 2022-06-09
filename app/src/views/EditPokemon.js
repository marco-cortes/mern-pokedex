import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PokemonForm } from "../components/pokemon/PokemonForm";
import { Header } from "../components/ui/Header";
import { getPokemon } from "../redux/actions/pokemon";
import Loading from "./Loading";

export const EditPokemon = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.pokemon);

    useEffect(() => {
        dispatch(getPokemon(id));
    }, [dispatch, id]);

    if (loading)
        return
        <div className="container">
            <Loading />
        </div>

    return (
        <div className="container">
            <Header />
            <PokemonForm title={"Edit pokemon"} subtitle={"Start edit your pokemon"} />
        </div>
    )
}
