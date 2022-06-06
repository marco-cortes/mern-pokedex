import { useDispatch, useSelector } from "react-redux"
import { Header } from "../components/ui/Header"
import { resetPokemon } from "../redux/actions/pokemon";
import { useEffect } from "react";
import { PokemonForm } from "../components/pokemon/PokemonForm";

export const NewPokemon = () => {

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetPokemon());
    }, [dispatch]);

    if (!user) return <h1>Loading...</h1>

    return (
        <div className="container">
            <Header />
            <PokemonForm />
        </div>
    )
}
