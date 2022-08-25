import { doc, deleteDoc } from "firebase/firestore";
import {db} from '@/firebase/config';


const deletePost = async (path, postID) => {
    await deleteDoc(doc(db, path, postID));
}

export default deletePost;