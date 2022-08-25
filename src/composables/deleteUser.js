import {deleteUser} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import {db} from "@/firebase/config";
import useGetAllPosts from '@/composables/getAllPosts'
import {ref} from "vue";

import getUser from "@/composables/getUser";
const isPending = ref(false)

const deleteUserAccount = async () => {
    isPending.value = true

    try {
        const {user} = getUser()
        const {posts, getAllPosts} = useGetAllPosts()
        await getAllPosts("posts", "price.price", 'desc', 10000, "author.id", "==", user.value.uid);

        if(posts.value.length > 0) {
            for (let i = 0; i <= posts.value.length; i++) {
                await deleteDoc(doc(db, "posts", posts.value[i].id))
            }
        }

        await deleteDoc(doc(db, 'users', user.value.uid));
        isPending.value = false;

        await deleteUser(user.value);
    } catch (e) {
        isPending.value = false
    }
}

const useDeleteUserAccount = () => {
    return {deleteUserAccount, isPending}
}

export default useDeleteUserAccount;