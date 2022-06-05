import { useState } from "react";
import { useSelector } from "react-redux";
import { uploadImages } from "../../helpers/upload";

export const ImagesPokemon = () => {
    const user = useSelector(state => state.auth.user);
    const { pokemon } = useSelector(state => state.pokemon);

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);


    const fileChange = (e) => {
        console.log(e.target.files)
        setImages([...e.target.files]);
        //setImages();
    }

    const uploadFiles = async (e) => {
        e.preventDefault();
        setLoading(true);
        const urls = await uploadImages(user, pokemon, images);
        pokemon.images = urls;
        setLoading(false);
        console.log(pokemon);
    }


    return (
        <div className="profile-update-photo">
            <button type="submit" className="profile-btn" style={{
                margin: "1.5rem auto",
                padding: "0.5rem 0",
            }} onClick={uploadFiles}>Upload</button>

            <input className="profile-photo-update" id="profile-photo-update" type="file" name="photo" onChange={fileChange} accept="image/png,image/jpeg" disabled={loading} multiple />
            <label className="pokemon-photos " htmlFor="profile-photo-update" style={{
                marginBottom: "1.5rem",
            }}>
                {
                    loading ? <h1>Loading...</h1>
                        :
                        images.length > 0 ?
                            images.map((image, index) => (
                                <p className="profile-photo-update-name" key={index}>{image.name}</p>
                            ))
                            :
                            <>
                                <div className="profile-photo-update-icon-div">
                                    <i className="fa-solid fa-file-arrow-up profile-photo-update-icon"></i>
                                </div>
                                <span className="profile-photo-update-text">Select your images</span>
                            </>
                }
            </label>
        </div>
    )
}
