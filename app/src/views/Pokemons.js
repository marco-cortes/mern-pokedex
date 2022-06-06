import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardList } from "../components/card/CardList";
import { Header } from "../components/ui/Header"
import { getMyPokemons } from "../redux/actions/pokemon";

export const Pokemons = () => {

  const { myPokemons } = useSelector(state => state.pokemon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPokemons());
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      <div className="text-center">
        <h3 className="auth-h3">My pokemons</h3>
        <h1 className="auth-h1">My pokemons list<span className="auth-blue">.</span></h1>
      </div>
      <CardList pokemons={myPokemons} />
    </div>
  )
}
