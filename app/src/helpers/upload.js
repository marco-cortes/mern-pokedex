import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase-config";

export const uploadImages = async (user, pokemon, images) => {
    const urls = await Promise.all(
        images.map(async file => {
            const filePath = `images/${user._id}/${pokemon.name}/${file.name}`;
            const fileRef = ref(storage, filePath)
            await uploadBytesResumable(fileRef, file);
            const url = await getDownloadURL(fileRef);
            return url;
        })
    )

    return urls;
}

export const uploadProfilePhoto = async (user, file) => {
    const filePath = `user/${user._id}/profile.jpg`;
    const fileRef = ref(storage, filePath)
    await uploadBytesResumable(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
}

export const deletePhoto = async (url) => {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
    //console.log(fileRef);
}