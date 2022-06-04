import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase-config";

export const uploadImages = async (user, images) => {
    const urls = await Promise.all(
        images.map(async file => {
            const filePath = `images/${user._id}/${file.name}`;
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