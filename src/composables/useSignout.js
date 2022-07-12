import {signOut} from "firebase/auth";
import {auth} from '@/firebase/config'

// signOut(auth).then(() => {
//     // Sign-out successful.
// }).catch((error) => {
//     // An error happened.
// });
const signout = async () => {
    await signOut(auth);
}

const useSignout = () => {
    return {signout}
}

export default useSignout