import { useState } from "react";

export const InputRange = ({ title, name, icon, placeholder }) => {

    const [value, setValue] = useState(0);

    const handleChange = (e) => {
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
