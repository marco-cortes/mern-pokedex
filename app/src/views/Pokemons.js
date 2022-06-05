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
      <CardList pokemons={myPokemons} />
    </div>
  )
}
