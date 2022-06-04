import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "../../helpers/useForm";
import { updatePassword } from "../../redux/actions/auth";
import { AuthInput } from "../auth/AuthInput";

export const ChangePassword = () => {

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const [form, setForm] = useForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const save = (e) => {
        e.preventDefault();
        if(form.newPassword !== form.confirmPassword) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The passwords do not match!",
            });
        }
        user.password = form.oldPassword;
        dispatch(updatePassword(user, form.newPassword));
    }

    if(!user)
        return <h1>Loading...</h1>;

    return (
        <>
          <form className="profile-password" onSubmit={save}>
            <AuthInput name={"oldPassword"} title={"Old password"} type={"password"} value={form.oldPassword} setForm={setForm} placeholder={"Your old password"} password />
            <AuthInput name={"newPassword"} title={"New password"} type={"password"} value={form.newPassword} setForm={setForm} placeholder={"Your new password"} password />
            <AuthInput name={"confirmPassword"} title={"Confirm password"} type={"password"} value={form.confirmPassword} setForm={setForm} placeholder={"Confirm your password"} password />
            <button className="profile-btn" style={{
                width: "100%",
            }} type="submit">Change password</button>
          </form>
        </>
    )
}