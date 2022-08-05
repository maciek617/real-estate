import {signOut} from "firebase/auth";
import {auth} from '@/firebase/config'

const signout = async () => {
    await signOut(auth);
}

const useSignout = () => {
    return {signout}
}

export default useSignout