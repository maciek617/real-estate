import {auth} from '@/firebase/config'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {ref} from "vue";

const error = ref(null);
const isPending = ref(false);


const signup = async (email, password, displayName) => {
    error.value = null;
    isPending.value = true;

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const update = await updateProfile(auth.currentUser, {
            displayName: displayName
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