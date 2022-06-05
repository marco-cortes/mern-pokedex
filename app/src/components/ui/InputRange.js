import { useState } from "react";
import { useSelector } from "react-redux";

export const InputRange = ({ title, name, icon, placeholder }) => {

    const { pokemon } = useSelector(state => state.pokemon);

    const [value, setValue] = useState(0);

    const handleChange = (e) => {

        switch (name) {

            case "hp":
                pokemon.stats.hp = e.target.value;
                break;
            case "attack":
                pokemon.stats.attack = e.target.value;
                break;
            case "defense":
                pokemon.stats.defense = e.target.value;
                break;
            case "specialAttack":
                pokemon.stats.specialAttack = e.target.value;
                break;
            case "specialDefense":
                pokemon.stats.specialDefense = e.target.value;
                break;
            case "speed":
                pokemon.stats.speed = e.target.value;
                break;
            case "total":
                pokemon.stats.total = e.target.value;
                break;
            default:
                break;
        }

        console.log(pokemon);
        
        setValue(e.target.value);



    }

    return (
        <div className="group-range" style={{
            flexDirection: "column",
        }}>

            <div className="input-range-div">
                <div style={{
                    width: "100%",
                }}>
                    <label className="auth-label" htmlFor={name}>{title}</label> <br />
                    <input type="range" className="input-range" name={name} value={value} onChange={handleChange}></input>
                    <input type="text" className="auth-input" value={value} onChange={handleChange} placeholder={placeholder}></input>
                </div>
                <i className={"fa-solid " + icon + " auth-icon "}></i>
            </div>
        </div>
    )
}
