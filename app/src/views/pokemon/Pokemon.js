import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { getPokemon } from "../redux/actions/pokemon";

export const Pokemon = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { pokemon } = useSelector(state => state.pokemon);

    useEffect(() => {
        dispatch(getPokemon(id));
    }, [dispatch, id]);

    if (!pokemon)
        return <div>Loading...</div>

    return (
        <div className="container">
            <Header />
            Pokemon
        </div>
    )
}
