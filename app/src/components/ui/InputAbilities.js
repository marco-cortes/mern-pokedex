import { useState } from "react";
import { useSelector } from "react-redux"

export const InputAbilities = () => {

    const { pokemon } = useSelector(state => state.pokemon);

    const [ability, setAbility] = useState("");

    const handleChange = (e) => {
        setAbility(e.target.value);
    }

    const addAbility = (e) => {

        if(ability.trim() === "") 
            return;

        if(!pokemon.abilities)
            pokemon.abilities = [];

        pokemon.abilities.push(ability);

        setAbility("");

        console.log(pokemon);
    }

    return (
        <div className="abilities">
            <div className="auth-group" style={{
                marginTop: "1.5rem",
            }}>
                <div className="input-ability">
                    <div className="auth-input-label input-ability-container">
                        <label className="auth-label" htmlFor={"abilities"}>{"Abilities"}</label>
                        <input className="auth-input" type={"text"} name={"abilities"} id={"abilities"} value={ability} onChange={handleChange} placeholder={"Input an ability"} />
                    </div>
                    <button className="profile-btn btn-dark ability-btn" type={"button"} onClick={addAbility}>{"Add"}</button>
                </div>
                <i className={"fa-solid fa-wand-sparkles auth-icon "}></i>
            </div>
            {
                pokemon.abilities &&  
                <div className="pokemon-abilities">
                    {
                        pokemon.abilities.map((ability, index) => (
                            <span className="ability" key={index}>{ability}</span>
                        ))
                    }
                </div>
            }
        </div>
    )
}
