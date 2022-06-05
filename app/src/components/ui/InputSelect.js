import { useState } from "react";
import { useSelector } from "react-redux";

export const InputSelect = ({ text, name, items:init }) => {

    const { pokemon } = useSelector(state => state.pokemon);

    const [items, setItems] = useState(init);
    const [selected, setSelected] = useState([]);

    const handleChange = (e) => {
        const { value } = e.target;
        
        if(e.target.value === -1)
            return;

        const id = parseInt(value);
        const type = items.find(item => item.id === id);
        
        setItems(items.filter(item => item.id !== type.id));
        setSelected([...selected, type]);

        pokemon.types = [...selected, type.name];
        console.log(pokemon);
        e.target.value = -1;
    }

    return (
        <>
            <div className="input-select-container">
                <div className="input-select">
                    <label className="auth-label" htmlFor={name}>{text}</label>
                    <select className="input-selection" name={name} onChange={handleChange}>
                        <option value={-1}>Seleccione una opción</option>
                        {
                            items.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>{item.name}</option>
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
                            selected.map((item, index) => (
                                <div key={index} className={"type " + item.name.toLowerCase()}>
                                    <span>{item.name}</span>
                                    <img src={item.icon} alt={item.name} className="type-img" />
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
