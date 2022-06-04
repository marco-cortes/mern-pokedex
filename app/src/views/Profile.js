import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthInput } from "../components/auth/AuthInput";
import { ChangePassword } from "../components/profile/ChangePassword";
import { ImageProfile } from "../components/profile/ImageProfile";
import { UpdatePhoto } from "../components/profile/UpdatePhoto";
import { Header } from "../components/ui/Header"
import { Modal } from "../components/ui/Modal";
import { useForm } from "../helpers/useForm";
import { saveUser } from "../redux/actions/auth";
import { showModal } from "../redux/actions/ui";

export const Profile = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const [state, setState] = useState(false);

    const [form, setForm] = useForm({
        _id: user._id,
        name: "" || user.name,
        lastName: "" || user.lastName,
        email: "" || user.email,
        photo: "" || user.photo,
    });

    const save = (e) => {
        e.preventDefault();
        dispatch(saveUser(form));
    }

    const showPhoto = () => {
        setState(true)
        dispatch(showModal());
    }

    const showPassword = () => {
        setState(false)
        dispatch(showModal());
    }


    if (!user)
        return <h1>Loading...</h1>;


    return (
        <div className="container">
            <Header />
            <div className="profile-container">
                <h3 className="auth-h3">My Profile</h3>
                <h1 className="auth-h1">Edit your profile<span className="auth-blue">.</span></h1>
                <ImageProfile user={user} show={showPhoto} />
                <form className="profile-form" onSubmit={save}>
                    <div className="flex">
                        <AuthInput name={"name"} title={"First name"} type={"text"} icon="fa-address-card" value={form.name} setForm={setForm} placeholder={"Name"} />
                        <AuthInput name={"lastName"} title={"Last name"} type={"text"} icon="fa-address-card" value={form.lastName} setForm={setForm} placeholder={"Last name"} />
                    </div>
                    <AuthInput name={"email"} title={"Email"} type={"email"} icon="fa-envelope" value={form.email} setForm={setForm} placeholder={"example@email.com"} />
                    <div className="profile-btns">
                        <button type="button" className="profile-btn btn-dark" onClick={showPassword}>Update password</button>
                        <button type="submit" className="profile-btn">Save</button>
                    </div>
                </form>
            </div>
            <Modal title={state ? "Update profile photo" : "Update your password"}>
                {
                    state ? <UpdatePhoto /> : <ChangePassword />
                }
            </Modal>
        </div>
    )
}
