import {getDownloadURL, ref as firebaseRef, uploadBytesResumable} from "firebase/storage";
import {storage} from "@/firebase/config";
import {ref} from "vue";

const temp_links = ref([]);
const uploadAllImages = ref(false);
const progress = ref(null)
const uploadFiles = async (file, path, pending, upload, links, fileLength, user) => {
    if (!file) return;
    upload.value = false
    pending.value = true;
    upload.value = false;
    links.value = [];


    for (let i = 0; i < file.length; i++) {
        const storageRef = firebaseRef(storage, `/${user}/houses/${path}/${file[i].name}`)
        const uploadTask = uploadBytesResumable(storageRef, file[i])

        await uploadTask.on("state_changed", (snapshot) => {
                progress.value = snapshot.bytesTransferred / snapshot.totalBytes
            }, (err) => {
                console.log(err)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        links.value.push(url);
                        temp_links.value.push(url);

                        if (links.value.length === fileLength) {
                            upload.value = true;
                            pending.value = false;
                            uploadAllImages.value = true;
                        }
                    })
            })
    }
}


const useUploadFiles = () => {
    return {uploadFiles, temp_links, uploadAllImages, progress}
}

export default useUploadFiles