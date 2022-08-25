import {query, where, orderBy, limit, getDocs, collection, startAfter} from "firebase/firestore";
import {db} from "@/firebase/config";
import {ref} from 'vue';

const posts = ref([])
const isLoading = ref(false);
const lastVisibleItem = ref(null);


const getAllPosts = async (pathField, orderByField, direction, limitField, whereField, operatorWhereField, whereValueField) => {
    isLoading.value = true;
    try {
        const q = query(collection(db, pathField), where(whereField, operatorWhereField, whereValueField), orderBy(orderByField, direction), limit(limitField));
        const querySnapshot = await getDocs(q);
        lastVisibleItem.value = querySnapshot.docs[querySnapshot.docs.length-1];
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
}


const nextPosts = ref([]);
const nextPost = async (pathField, orderByField, direction, lastVisible, limitField, whereField, operatorWhereField, whereValueField) => {
    try {
        const q = query(collection(db, pathField), where(whereField, operatorWhereField, whereValueField), orderBy(orderByField, direction), startAfter(lastVisible), limit(limitField));
        const querySnapshot = await getDocs(q);
        let post_temp = [];
        querySnapshot.forEach((doc) => {
            post_temp.push(doc.data())
        });
        nextPosts.value = post_temp;
        posts.value.push(...nextPosts.value);
        lastVisibleItem.value = querySnapshot.docs[querySnapshot.docs.length-1];
    } catch (e) {
        console.log(e);
    }
}

const useGetAllPosts = () => {
    return {getAllPosts, posts, isLoading, nextPost, nextPosts, lastVisibleItem}
}

export default useGetAllPosts;