import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUploadPhoto } from "../../redux/actions/auth";
import { closeModal } from "../../redux/actions/ui";
import Loading from "../../views/Loading";

export const UpdatePhoto = () => {

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);


    const fileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const uploadFile = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(startUploadPhoto(user, image)).then(() => {
            setLoading(false);
            dispatch(closeModal());
        });
    }


    if (!user) return <h1>Loading...</h1>;

    return (
        <form className="profile-update-photo" onSubmit={uploadFile}>
            <input className="profile-photo-update" id="profile-photo-update" type="file" name="photo" onChange={fileChange} accept="image/png,image/jpeg" disabled={loading} />
            <label className="profile-photo-update-label" htmlFor="profile-photo-update">
                {
                    loading ? <Loading />
                        :
                        image ? <p className="profile-photo-update-name">{image.name}</p>
                            :
                            <>
                                <div className="profile-photo-update-icon-div">
                                    <i className="fa-solid fa-file-arrow-up profile-photo-update-icon"></i>
                                </div>
                                <span className="profile-photo-update-text">Select your photo</span>
                            </>
                }
            </label>
            <button type="submit" className="profile-btn" style={{
                margin: "0 auto",
                marginTop: "2rem",
                padding: "0.5rem 1rem",
            }}>Upload</button>
        </form>
    )
}
