import {GoogleAuthProvider, getAuth, reauthenticateWithPopup} from 'firebase/auth'
import useDeleteUserAccount from "@/composables/deleteUser";

const reAuthGoogle = async () => {
    const auth = getAuth()
    const result = await reauthenticateWithPopup(auth.currentUser, new GoogleAuthProvider());
    if (result) {
        const {deleteUserAccount} = useDeleteUserAccount()
        await deleteUserAccount();
    }
}

export default reAuthGoogle