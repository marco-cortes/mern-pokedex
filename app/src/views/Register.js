import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthInput } from "../components/auth/AuthInput";
import { useForm } from "../helpers/useForm";
import { register } from "../redux/actions/auth";

export default function Register() {

    const dispatch = useDispatch();

    const [form, setForm] = useForm({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const startRegister = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword)
            return Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden",
                icon: "error",
            });
        dispatch(register(form.name, form.lastName, form.email, form.password));
    }

    return (
        <div className="auth-container">
            <div className="auth-content">
                <h3 className="auth-h3">WELCOME TO POKÉDEX</h3>
                <h1 className="auth-h1">Create new account<span className="auth-blue">.</span></h1>
                <p className="auth-p">Already A Member? <Link className="auth-link" to={"/login"}>Log in</Link></p>
                <form className="auth-form" onSubmit={startRegister}>
                    <div className="flex">
                        <AuthInput name={"name"} title={"First name"} type={"text"} icon="fa-address-card" value={form.name} setForm={setForm} placeholder={"Name"} />
                        <AuthInput name={"lastName"} title={"Last name"} type={"text"} icon="fa-address-card" value={form.lastName} setForm={setForm} placeholder={"Last name"} />
                    </div>
                    <AuthInput name={"email"} title={"Email"} type={"email"} icon="fa-envelope" value={form.email} setForm={setForm} placeholder={"example@email.com"} />
                    <AuthInput name={"password"} title={"Password"} type={"password"} icon="fa-eye" value={form.password} setForm={setForm} placeholder={"Your password"} password />
                    <AuthInput name={"confirmPassword"} title={"Confirm password"} type={"password"} icon="fa-eye" value={form.confirmPassword} setForm={setForm} placeholder={"Confirm your password"} password />
                    <button type="submit" className="auth-btn">Sign Up!</button>
                </form>
            </div>
        </div>
    )
}