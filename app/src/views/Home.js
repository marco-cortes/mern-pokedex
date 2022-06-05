import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardList } from "../components/card/CardList";
import { Header } from "../components/ui/Header"
import { getPokemons } from "../redux/actions/pokemon";

export const Home = () => {

  const { pokemons } = useSelector(state => state.pokemon);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      <CardList pokemons={pokemons} />
    </div>
  )
}
