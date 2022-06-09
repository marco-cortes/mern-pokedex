import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../redux/actions/ui";

export const Modal = ({ title, children }) => {

    const showModal = useSelector(state => state.ui.showModal);
    const dispatch = useDispatch();

    const close = () => {
        const modal = document.getElementById("modal");
        modal.classList.remove("animate__animated", "animate__fadeIn");
        modal.classList.add("animate__animated", "animate__fadeOut");
        setTimeout(() => {
            dispatch(closeModal());
        }, 300);
    }

    if (!showModal)
        return null;

    return (
        <div className="modal-container">
            <div className="modal animate__animated animate__fadeIn" id="modal">
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <i className="fa-solid fa-times close-modal" onClick={close}></i>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}