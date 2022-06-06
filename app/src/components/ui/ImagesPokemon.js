import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deletePhoto, uploadImages } from "../../helpers/upload";
import { savePokemon } from "../../redux/actions/pokemon";

export const ImagesPokemon = () => {
    const user = useSelector(state => state.auth.user);
    const { pokemon } = useSelector(state => state.pokemon);
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(-1);


    const fileChange = (e) => {
        console.log(e.target.files)
        setImages([...images, ...e.target.files]);
        //setImages();
    }

    const uploadFiles = async (e) => {
        e.preventDefault();
        setLoading(0);
        const urls = await uploadImages(user, pokemon, images);
        if(!pokemon.images)
            pokemon.images = [];
        pokemon.images = [...pokemon.images, ...urls];
        setLoading(1);
        setImages([]);
        //console.log(pokemon);
    }

    const quitImage = (image) => {
        setImages(images.filter(img => img !== image));
    }

    const deleteImage = async (image) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deletePhoto(image);
                pokemon.images = pokemon.images.filter(img => img !== image);
                dispatch(savePokemon(pokemon)).then(() => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
            }
        })
    }


    return (
        <>
            <div className="pokemon-images-container">

                <input className="pokemon-images" id="pokemon-images" type="file" name="photo" onChange={fileChange} accept="image/png,image/jpeg" multiple />
                <label className="profile-btn images-btn" htmlFor="pokemon-images">
                    Select your images
                    <i className="fa-solid fa-file-arrow-up photo-icon"></i>
                </label>

                <button type="submit" className="profile-btn btn-dark" onClick={uploadFiles}>Upload</button>
            </div>
            <div className="images-container">
                {
                    pokemon.images && pokemon.images.map((image, index) => (
                        <div className="pokemon-photo-container" key={index}>
                            <img key={index} src={image} alt="pokemon" className="pokemon-photo" />
                            <button className="btn-delete" type="button" onClick={() => deleteImage(image)}>
                                <i className="fa-solid fa-x"></i>
                            </button>
                        </div>
                    ))
                }
                {
                    images.length > 0 &&
                    images.map((image, index) => (
                        <div className="pokemon-photo-container" key={index}>
                            <img src={URL.createObjectURL(image)} alt="pokemon" className="pokemon-photo" />
                            {
                                loading === -1 ?
                                    <button className="btn-delete" type="button" onClick={() => quitImage(image)}>
                                        <i className="fa-solid fa-x"></i>
                                    </button>
                                    : loading === 0 ?
                                        <div className="status">
                                            <i className="fa-solid fa-spinner fa-spin"></i>
                                        </div>
                                        :
                                        <div className="status">
                                            <i className="fa-solid fa-check" style={{ color: "green" }}></i>
                                        </div>
                            }

                        </div>
                    ))
                }
            </div>
        </>
    )
}
