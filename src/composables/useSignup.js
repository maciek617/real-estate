import {auth, db} from '@/firebase/config'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {ref} from "vue";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";



const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
    error.value = null;
    isPending.value = true;

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const update = await updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: 'https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        });


        await setDoc(doc(db, "users", auth.currentUser.uid), {
            id: auth.currentUser.uid,
            name: displayName,
            photo: auth.currentUser.photoURL,
            bg_photo: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            email: auth.currentUser.email,
            bio: 'Update your bio',
            jobTitle: {
                display: true,
                title: 'Add job title title'
            },
            location: 'Add location',
            social_links: [{
                fb: 'Add Facebook',
                ig: 'Add Instagram',
                web: 'Add Website'
            }],
            joinDate: serverTimestamp()
        });

        if (!res && !update) {
            isPending.value = false;
            error.value = 'Could not finish. Try again!'
        }

        isPending.value = false;
        error.value = null;
    } catch (e) {
        const err = e.code.slice(5);
        error.value = err.charAt(0).toUpperCase() + err.slice(1).replaceAll("-", " ");
        isPending.value = false;
    }
}

const useSignup = () => {
    return {signup, isPending, error}
}

export default useSignup