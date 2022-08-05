import {auth} from '@/firebase/config'
import {deleteUser} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import {db} from "@/firebase/config";
import useGetAllPosts from '@/composables/getAllPosts'
import {ref} from "vue";

const isPending = ref(false)
const deleteUserAccount = async () => {
    isPending.value = true
    const user = auth.currentUser;

    const {posts, getAllPosts} = useGetAllPosts()
    await getAllPosts("posts", "price.price", 'desc', 10000, "author.id", "==", user.uid);


    if(posts.value.length > 0) {
        for (let i = 0; i < posts.value.length; i++) {
            await deleteDoc(doc(db, "posts", posts.value[i].id))
            console.log(posts.value[i].id)
        }
    }

    await deleteDoc(doc(db, 'users', user.uid))
    await deleteUser(user)
    isPending.value = false
}

const useDeleteUserAccount = () => {
    return {deleteUserAccount, isPending}
}

export default useDeleteUserAccount;