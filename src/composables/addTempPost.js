import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from '@/firebase/config'
import {ref} from "vue";
import getUser from "@/composables/getUser";

const docID = ref('');
const createTempPost = async () => {
    const {user} = getUser();
    const docRef = await addDoc(collection(db, "post_archived"), {
        title: '',
        category: '',
        price: {
            isNegotiable: false,
            price: ''
        },
        location: '',
        quality: '',
        owner: '',
        basic_info: {
            surface: '',
            rooms: '',
            bathrooms: '',
            floor_: '',
            heating: ''
        },
        additional_info: {
            balcony: '',
            garden: '',
            parking: '',
        },
        description: '',
        contact_details: {
            name: '',
            email: '',
            phone: ''
        },
        author: {
            id: user.value.uid,
            name: ''
        },
        main_photo: '',
        id: '',
        images: []
    })

    docID.value = docRef.id

    const tempDoc = doc(db, "post_archived", docID.value)

    await updateDoc(tempDoc, {
        id: docID.value
    })
}


const useCreateTempPost = () => {
    return {docID, createTempPost}
}
export default useCreateTempPost