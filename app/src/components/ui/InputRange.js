import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const InputRange = ({ title, name, icon, placeholder }) => {

    const { pokemon } = useSelector(state => state.pokemon);

    const [value, setValue] = useState(pokemon.stats[name] || 0);

    const handleChange = (e) => {
        pokemon.stats[name] = parseInt(e.target.value);
        setValue(e.target.value);
        console.log(pokemon);
    }

    useEffect(() => {
        if (pokemon.stats[name])
            setValue(pokemon.stats[name]);
        else
            setValue(0);
    }, [pokemon, name]);

    return (
        <div className="group-range" style={{
            flexDirection: "column",
        }}>

            <div className="input-range-div">
                <div style={{
                    width: "100%",
                }}>
                    <label className="auth-label" htmlFor={name}>{title}</label> <br />
                    <input type="range" className="input-range"
                        name={name}
                        value={value}
                        onChange={handleChange}
                        min="0"
                        max="300"
                    />
                    <input type="text" className="auth-input" value={value} onChange={handleChange} placeholder={placeholder}></input>
                </div>
                <i className={"fa-solid " + icon + " auth-icon "}></i>
            </div>
        </div>
    )
}
