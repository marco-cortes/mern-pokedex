import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const icons = require.context("../../assets/images/types", true);

export const Card = ({ pokemon }) => {

    const { user } = useSelector(state => state.auth);

    return (
        <div className="card">
            <div className="card-image">
                <img src={pokemon.images[0]} alt={pokemon.name} />
            </div>
            <div className="card-content">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <img src={pokemon.user.photo} alt={pokemon.user.name} className="pokemon-user-photo" />
                    <div>
                        <h3 className="pokemon-name">{pokemon.name}</h3>
                        <h2 className="pokemon-user">By {pokemon.user.name} {pokemon.user.lastName}</h2>

                    </div>
                </div>
                <div className="pokemon-types">
                    {
                        <div className={`card-type ${pokemon.types[0].toLowerCase()}`}>
                            <span>{pokemon.types[0]}</span>
                            <img src={icons(`./Icon_${pokemon.types[0].toLowerCase()}.webp`)} className="card-type-image" alt={pokemon.types[0]} />
                        </div>
                    }
                </div>
            </div>
            <div className="card-btns">
                <Link to={`/pokemon/${pokemon._id}`} className="btn btn-primary" style={{
                    width: user._id !== pokemon.user._id ? "100%" : "45%",
                }}> 
                    More info 
                    <i className="fa-solid fa-angle-right"></i> 
                </Link>
                {
                    user._id === pokemon.user._id && <Link to={`/pokemon/${pokemon._id}/edit`} className=" btn btn-secondary"> Edit <i className="fa-solid fa-pen"></i> </Link>
                }
            </div>
        </div>
    )
}
