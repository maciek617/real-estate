import { ref } from "vue";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
    error.value = null;
    isPending.value = true;

    try {
        const res = await signInWithEmailAndPassword(auth, email, password);

        if (!res) {
           error.value = "Something went wrong."
        }
        console.log('User logged in')

        error.value = null;
        isPending.value = false;
    } catch (e) {
        const err = e.code.slice(5);
        error.value = err.charAt(0).toUpperCase() + err.slice(1).replaceAll("-", " ");
        isPending.value = false;
    }
};

const useLogin = () => {
    return { error, isPending, login };
};

export default useLogin;