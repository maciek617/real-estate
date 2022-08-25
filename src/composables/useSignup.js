import {auth} from '@/firebase/config'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {ref} from "vue";
import updateProfileOnSignup from './signupUpdate'

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfileOnSignup(displayName, error, isPending, res)

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