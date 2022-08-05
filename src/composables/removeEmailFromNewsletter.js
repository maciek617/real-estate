import {doc, updateDoc, arrayRemove} from "firebase/firestore";
import {db} from '@/firebase/config';

const removeEmail = async (email) => {
    const newsletterEmail = doc(db, 'newsletter', 'gX7HHx5y3STYoN78WYkF');
    try {
        await updateDoc(newsletterEmail, {
            email_base: arrayRemove(email)
        });
    } catch (e) {
        console.log(e)
    }
}

const getRemoveEmail = () => {
    return {removeEmail}
}

export default getRemoveEmail