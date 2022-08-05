import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase/config";
import {watchEffect} from "vue";

const update = async (path, docID, upload, links) => {
    let updatedField = doc(db, path, docID);


    console.log(docID)
    watchEffect(async () => {
        if (upload.value) {
            await updateDoc(updatedField, {
                id: docID,
                images: links.value
            });
        }
    })
}

export default update