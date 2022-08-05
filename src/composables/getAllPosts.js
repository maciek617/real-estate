import {query, where, orderBy, limit, getDocs, collection} from "firebase/firestore";
import {db} from "@/firebase/config";
import {ref} from 'vue';

const posts = ref([])
const isLoading = ref(false)
const getAllPosts = async (pathField, orderByField, direction, limitField, whereField, operatorWhereField, whereValueField) => {
    isLoading.value = true
    try {

        const q = query(collection(db, pathField), where(whereField, operatorWhereField, whereValueField), orderBy(orderByField, direction), limit(limitField));

        const querySnapshot = await getDocs(q);
        let post_temp = [];
        querySnapshot.forEach((doc) => {
            post_temp.push(doc.data())
        });

        posts.value = post_temp;
        isLoading.value = false
    } catch (e) {
        console.log(e);
        isLoading.value = false
    }

    return posts
}


const useGetAllPosts = () => {
    return {getAllPosts, posts, isLoading}
}

export default useGetAllPosts;