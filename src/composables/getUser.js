import {ref} from 'vue';
import {auth} from '@/firebase/config'
import {onAuthStateChanged} from 'firebase/auth'

const user = ref(null);


onAuthStateChanged(auth,  (_user) => {
    if (_user) {
        console.log(_user)
        console.log(_user.displayName);

        user.value = _user

    } else {
        user.value = null;
    }
});


const getUser = () => {
    return {user}
}

export default getUser;

