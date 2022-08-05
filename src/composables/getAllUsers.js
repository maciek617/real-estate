import {query, limit, getDocs, collection, orderBy} from "firebase/firestore";
import {db} from "@/firebase/config";
import {ref} from 'vue';

const users = ref([])

const getAllUsers = async (pathField, limitField) => {

    try {
        const q = query(collection(db, pathField), limit(limitField), orderBy('joinDate'));
        const querySnapshot = await getDocs(q);
        let users_temp = [];
        querySnapshot.forEach((doc) => {
            users_temp.push(doc.data())
            console.log(users_temp)
        });

        users.value = users_temp
        console.log(users.value)
    } catch (e) {
        console.log(e)
    }

    // return users
}


const useGetAllUsers = () => {
    return {getAllUsers, users}
}

export default useGetAllUsers;