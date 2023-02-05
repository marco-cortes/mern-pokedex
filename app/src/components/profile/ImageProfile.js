import imgUser from "../../assets/images/user.svg";

export const ImageProfile = ({ user, show }) => {

    const imageError = (e) => {
        e.target.src = imgUser;
    }

    return (
        <div className="profile-img">
            <div className="image-container">
                {
                    user.photo ? <img src={user.photo} alt={user.name} className="user-photo" onError={imageError} />
                        : <img src={imgUser} alt={user.name} className="user-photo" onError={imageError} />
                }
            </div>
            <i className="fa-solid fa-pen edit-photo" onClick={show}></i>
        </div>
    )
}
