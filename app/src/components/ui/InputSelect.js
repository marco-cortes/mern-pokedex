import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { icons, types } from "../../helpers/pokemonTypes";

export const InputSelect = ({ text, name }) => {

    const { pokemon } = useSelector(state => state.pokemon);

    const [typesList, setTypesList] = useState(types);
    const [selectedTypes, setSelectedTypes] = useState(pokemon.types || []);

    const handleChange = (e) => {
        const { value } = e.target;

        if (e.target.value === -1)
            return;

        setTypesList(typesList.filter(item => item.name !== value));
        setSelectedTypes([...selectedTypes, value]);

        if (!pokemon.types)
            pokemon.types = [];

        pokemon.types = [...pokemon.types, value];

        e.target.value = -1;
    }

    const handleDelete = (e, type) => {
        pokemon.types = pokemon.types.filter(item => item !== type);
        setSelectedTypes(selectedTypes.filter(item => item !== type));
        setTypesList(types);
    }

    useEffect(() => {
        if (selectedTypes.length > 0)
            setTypesList(types.filter(item => !selectedTypes.includes(item.name)));
    }, [selectedTypes]);

    useEffect(() => {
        if (pokemon.types)
            setSelectedTypes(pokemon.types);
        else
            setSelectedTypes([]);
    }, [pokemon])

    return (
        <>
            <div className="input-select-container">
                <div className="input-select">
                    <label className="auth-label" htmlFor={name}>{text}</label>
                    <select className="input-selection" name={name} onChange={handleChange}>
                        <option value={-1}>Seleccione una opción</option>
                        {
                            typesList.map((type, index) => {
                                return (
                                    <option key={index} value={type.name}>{type.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <i className={"fa-solid fa-list auth-icon "}></i>
            </div>
            <div className="input-select-resp">
                <div className="types-container">
                    <label className="auth-label type-label" htmlFor={name}>{text}</label>
                    <div className="types-list">
                        {
                            selectedTypes.map((type, index) => (
                                <div key={index} className={"type " + type.toLowerCase()}>
                                    <span>{type}</span>
                                    <img src={icons("./Icon_" + type.toLowerCase() + ".webp")} alt={type} className="type-img" />
                                    <div className="type-delete" onClick={e => handleDelete(e, type)}>
                                        <i className="fa-solid fa-x"></i>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <i className={"fa-solid fa-biohazard auth-icon "}></i>
            </div>
        </>
    )
}
