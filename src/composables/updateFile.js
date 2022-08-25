import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase/config";

const update = async (path, docID, links, main_photo) => {
    let updatedFile = doc(db, path, docID)
    await updateDoc(updatedFile, {
        id: docID,
        images: links,
        main_photo: main_photo
    })
}

export default update

