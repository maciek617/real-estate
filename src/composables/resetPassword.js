import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from '@/firebase/config'
import {ref} from "vue";

const errCode = ref('');
const errMsg = ref('');
const send = ref(false)

const sendReset = (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            errCode.value = '';
            errMsg.value = '';
            send.value = true
        })
        .catch((error) => {
            errCode.value = error.code;
            errMsg.value = error.message;
            send.value = false
        });
}


const useSendReset = () => {
    return {sendReset, errCode, errMsg, send}
}
export default useSendReset