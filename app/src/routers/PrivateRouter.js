import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRouter({ children }) {

    const { user } = useSelector(state => state.auth);
    const location = useLocation();

    if (user)
        localStorage.setItem("lastPath", location.pathname + location.search);

    return user ? children : <Navigate to={"/login"} />;
}
