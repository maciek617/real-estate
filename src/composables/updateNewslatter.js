import {doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import {db} from '@/firebase/config'

const newsletter = doc(db, "newsletter", "gX7HHx5y3STYoN78WYkF");

const updateNewsletter = async (email) => {
    await updateDoc(newsletter, {
        email_base: arrayUnion(email)
    });
}

const removeNewsletter = async (email) => {
    await updateDoc(newsletter, {
        email_base: arrayRemove(email)
    });
}

const useUpdateNewsletter = () => {
    return {updateNewsletter, removeNewsletter}
}

export default useUpdateNewsletter;