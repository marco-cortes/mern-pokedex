import { useRef, useState } from 'react'

export const AuthInput = ({name, title, type, icon, value, placeholder, setForm, password}) => {

    const inputPassword = useRef(null);
    const [show, setShow] = useState(false);

    const showPassword = () => {
        if(!password)
            return;

        if (inputPassword.current.type === "password") {
            inputPassword.current.type = "text";
            setShow(true);
        } else {
            inputPassword.current.type = "password";
            setShow(false);
        }
    }

    return (
        <div className="form-group auth-group">
            <div className="auth-input-label">
                <label className="auth-label" htmlFor={name}>{title}</label>
                <input className="auth-input" type={type} name={name} id={name} value={value} onChange={setForm} placeholder={placeholder} ref={inputPassword} required/>
            </div>
            <i className={!password ? "fa-solid " + icon + " auth-icon " : show ? "fa-solid fa-eye-slash auth-icon pointer" : "fa-solid fa-eye auth-icon pointer"} onClick={showPassword}></i>
        </div>
    )
}
