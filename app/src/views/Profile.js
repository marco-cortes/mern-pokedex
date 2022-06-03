import { useDispatch, useSelector } from "react-redux";
import { AuthInput } from "../components/auth/AuthInput";
import { Header } from "../components/ui/Header"
import { useForm } from "../helpers/useForm";
import { saveUser } from "../redux/actions/auth";

export const Profile = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const [form, setForm] = useForm({
        _id: user._id,
        name: "" || user.name,
        lastName: "" || user.lastName,
        email: "" || user.email,
    });

    const save = (e) => {
        e.preventDefault();
        dispatch(saveUser(form));
    }

    const showModal = () => {
        
    }


    return (
        <div className="container">
            <Header />
            <div className="profile-container">
                <h3 className="auth-h3">My Profile</h3>
                <h1 className="auth-h1">Edit your profile<span className="auth-blue">.</span></h1>
                <form className="profile-form" onSubmit={save}>
                    <div className="flex">
                        <AuthInput name={"name"} title={"First name"} type={"text"} icon="fa-address-card" value={form.name} setForm={setForm} placeholder={"Name"} />
                        <AuthInput name={"lastName"} title={"Last name"} type={"text"} icon="fa-address-card" value={form.lastName} setForm={setForm} placeholder={"Last name"} />
                    </div>
                    <AuthInput name={"email"} title={"Email"} type={"email"} icon="fa-envelope" value={form.email} setForm={setForm} placeholder={"example@email.com"} />
                    <div className="flex">
                        <button type="button" className="profile-btn btn-dark" onClick={showModal}>Update password</button>
                        <button type="submit" className="profile-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
