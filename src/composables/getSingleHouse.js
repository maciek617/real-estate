import {doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase/config";
import {ref} from "vue";


const error = ref('')
const data = ref(null)

const getSingleHouse = async (path, item) => {
    const docRef = doc(db, path, item);
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
        error.value = 'Something went wrong';
    } else {
        data.value = docSnap.data();
        error.value = ''
    }

    return data;
}


const useGetSingleHouse = () => {
    return{error, data, getSingleHouse}
}

export default useGetSingleHouse
