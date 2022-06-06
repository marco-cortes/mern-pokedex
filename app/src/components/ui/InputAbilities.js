import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

export const InputAbilities = () => {

    const { pokemon } = useSelector(state => state.pokemon);
    const [abilities, setAbilities] = useState(pokemon.abilities || []);

    const [ability, setAbility] = useState("");

    const handleChange = (e) => {
        setAbility(e.target.value);
    }

    const addAbility = (e) => {

        if (ability.trim() === "")
            return;

        if (!pokemon.abilities)
            pokemon.abilities = [];

        if(!pokemon._id)
            pokemon.abilities.push(ability);

        setAbilities([...abilities, ability]);

        setAbility("");
    }

    const removeAbility = (e, ability) => {
        pokemon.abilities = pokemon.abilities.filter(item => item !== ability);
        setAbilities(abilities.filter(item => item !== ability));
    }

    const enter = (e) => {
        if (e.keyCode === 13)
            addAbility();
    }

    useEffect(() => {
        if (pokemon.abilities)
            setAbilities(pokemon.abilities);
        else
            setAbilities([]);
    }, [pokemon]);

    return (
        <div className="abilities">
            <div className="auth-group" style={{
                marginTop: "1.5rem",
            }}>
                <div className="input-ability">
                    <div className="auth-input-label input-ability-container">
                        <label className="auth-label" htmlFor={"abilities"}>{"Abilities"}</label>
                        <input className="auth-input" type={"text"} name={"abilities"} id={"abilities"} 
                        value={ability} 
                        onChange={handleChange} 
                        placeholder={"Input an ability"}
                        onKeyDown={enter} />
                    </div>
                    <button className="profile-btn btn-dark ability-btn" type={"button"} onClick={addAbility}>{"Add"}</button>
                </div>
                <i className={"fa-solid fa-wand-sparkles auth-icon "}></i>
            </div>
            {
                abilities.length > 0 &&
                <div className="pokemon-abilities">
                    {
                        abilities.map((ability, index) => (
                            <div className="ability" key={index}>
                                {ability}
                                <div className="remove-ability" onClick={e => removeAbility(e, ability)}>
                                    <i className="fa-solid fa-x"></i>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}
