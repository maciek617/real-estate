import {ref} from 'vue';
import {auth} from '@/firebase/config'
import {onAuthStateChanged} from 'firebase/auth'

const user = ref(null);


onAuthStateChanged(auth,  (_user) => {
    if (_user) {
        user.value = _user
    } else {
        user.value = null;
    }
});


const getUser = () => {
    return {user}
}

export default getUser;

