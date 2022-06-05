import { useSelector } from "react-redux";

export const InputPokemon = ({ name, title, type, icon, placeholder }) => {

    const { pokemon } = useSelector(state => state.pokemon);

    const handleChange = (e) => {
        switch(name) {
            case "name":
                pokemon.name = e.target.value;
            break;
            case "weight":
                pokemon.weight = e.target.value;
            break;
            case "height":
                pokemon.height = e.target.value;
            break;
            default:
            break;
        }

        console.log(pokemon);
    }

    return (
        <div className="form-group auth-group">
            <div className="auth-input-label">
                <label className="auth-label" htmlFor={name}>{title}</label>
                <input className="auth-input" type={type} name={name} id={name} onChange={handleChange} placeholder={placeholder} required/>
            </div>
            <i className={"fa-solid " + icon + " auth-icon "}></i>
        </div>
    )
}
