import {doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase/config"
import {ref} from "vue";


const data = ref(null);
const isPending = ref(false)

const getUserInfo = async (id) => {
    const docRef = doc(db, "users", id);
    isPending.value = true
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        data.value = docSnap.data();
        isPending.value = false
    } else {
        isPending.value = false
    }
}

const useGetUserInfo = () => {
    return {data, getUserInfo, isPending}
}

export default useGetUserInfo;