import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const InputPokemon = ({ name, title, type, icon, placeholder }) => {

    const { pokemon } = useSelector(state => state.pokemon);
    const [value, setValue] = useState(pokemon[name] || "");
    const handleChange = (e) => {
        pokemon[name] = e.target.value;
        setValue(e.target.value);
        //console.log(pokemon);
    }

    useEffect(() => {
        if(pokemon[name])
            setValue(pokemon[name]);
        else 
            setValue("");
    }, [pokemon, name]);

    return (
        <div className="form-group auth-group">
            <div className="auth-input-label">
                <label className="auth-label" htmlFor={name}>{title}</label>
                <input className="auth-input" type={type} name={name} id={name} value={value} onChange={handleChange} placeholder={placeholder} required />
            </div>
            <i className={"fa-solid " + icon + " auth-icon "}></i>
        </div>
    )
}
