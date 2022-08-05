import {getDownloadURL, ref as firebaseRef, uploadBytesResumable} from "firebase/storage";
import {storage} from "@/firebase/config";

const uploadFiles = async (file, path, pending, upload, links, fileLength, user) => {
    if (!file) return;

    pending.value = true;
    upload.value = false;
    links.value = [];
    for (let i = 0; i < file.length; i++) {
        const storageRef = firebaseRef(storage, `/${user}/houses/${path}/${file[i].name}`)
        const uploadTask = uploadBytesResumable(storageRef, file[i])

        await uploadTask.on("state_changed", (snapshot) => {
                console.log(snapshot) // TODO: Progress bar
            }, (err) => {
                console.log(err)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        links.value.push(url)
                        if (links.value.length === fileLength) {
                            upload.value = true;
                            pending.value = false;
                            console.log(links.value, 'Upload file')
                        }
                    })
            })
    }
}


export default uploadFiles