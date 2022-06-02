import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRouter({ children }) {

    const { user } = useSelector(state => state.auth);
    const lastPath = localStorage.getItem("lastPath");

    return !user ? children : lastPath ? <Navigate to={lastPath} /> : <Navigate to={"/"} />;
}
