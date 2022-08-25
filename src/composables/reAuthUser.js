import {EmailAuthProvider, getAuth, reauthenticateWithCredential,} from 'firebase/auth'
import useDeleteUserAccount from "@/composables/deleteUser";

const reAuth = async () => {
    const auth = getAuth()

    const promptForPassword = () => {
        return  prompt('Enter your password');
    }

   const password = promptForPassword()

    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
    )

    const result = await reauthenticateWithCredential(
        auth.currentUser,
        credential
    );


    if (result) {
        const {deleteUserAccount} = useDeleteUserAccount()
        await deleteUserAccount();
    }

}

export default reAuth;
