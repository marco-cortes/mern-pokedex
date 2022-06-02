import { Link } from "react-router-dom";
import { useForm } from "../helpers/useForm";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/auth";
import { AuthInput } from "../components/auth/AuthInput";

export default function Login() {

  const dispatch = useDispatch();

  const [form, setForm] = useForm({
    email: "",
    password: ""
  });

  const startLogin = (e) => {
    e.preventDefault();
    dispatch(login(form.email, form.password));
  }

  return (
    <div className="auth-container">
            <div className="auth-content"> 
                <h3 className="auth-h3">WELCOME TO POKÉDEX</h3>
                <h1 className="auth-h1">Log In<span className="auth-blue">.</span></h1>
                <p className="auth-p">Don't Have An Account? <Link className="auth-link" to={"/register"}>Sign Up</Link></p>
                <form className="auth-form" onSubmit={startLogin}>
                    <AuthInput name={"email"} title={"Email"} type={"email"} icon="fa-envelope" value={form.email} setForm={setForm} placeholder={"example@email.com"} />
                    <AuthInput name={"password"} title={"Password"} type={"password"} icon="fa-eye" value={form.password} setForm={setForm} placeholder={"Your password"} password />
                    <button type="submit" className="auth-btn">Log In</button>
                </form>
            </div>
        </div>
  )
}