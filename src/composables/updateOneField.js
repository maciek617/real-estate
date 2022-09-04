import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase/config";

const updateSingleField = async (path, docID, changes) => {
    let updatedFile = doc(db, path, docID)

    //Changes must be obj.
    await updateDoc(updatedFile, changes)
}

export default updateSingleField;
