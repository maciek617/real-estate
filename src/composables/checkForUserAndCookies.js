import getUser from "@/composables/getUser";
import {useCookies} from "vue3-cookies";
import {computed} from "vue";

const {user} = getUser();
const {cookies} = useCookies();

const checkIfUserWasLoggedIn = computed(() => {
    return cookies.get('was_logged') === 'true'
});

const checkForUserAndCookies = () => {
    if (user.value) {
        return 'find-house'
    } else if (checkIfUserWasLoggedIn.value) {
        return 'login'
    } else {
        return 'signup'
    }
}

export default checkForUserAndCookies