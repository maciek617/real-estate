import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from '@/firebase/config'
import {ref} from "vue";
import uploadFiles from "@/composables/uploadFile";
import update from "@/composables/updateFile";
const urls = ref([]);
const isPending = ref(false);
const uploadDone = ref(false);

const addPost = async (data, category, quality, owner, file, fileLength, user) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            title: data.title,
            category: category,
            price: {
                isNegotiable: data.price.isNegotiable,
                price: data.price.price
            },
            location: data.location,
            quality: quality,
            owner: owner,
            basic_info: {
                surface: data.basic_info.surface,
                rooms: data.basic_info.rooms,
                bathrooms: data.basic_info.bathrooms,
                floor_: data.basic_info.floor_,
                heating: data.basic_info.heating
            },
            additional_info: {
                balcony: data.additional_info.balcony,
                garden: data.additional_info.garden,
                parking: data.additional_info.parking
            },
            description: data.description,
            contact_details: {
                name: data.contact_details.name,
                email: data.contact_details.email,
                phone: data.contact_details.phone
            },
            timestamp: serverTimestamp(),
            author: {
                id: user.value.uid,
                name: user.value.displayName
            }
        });


        console.log(docRef.id)

        await uploadFiles(file, docRef.id, isPending, uploadDone, urls, fileLength, user.value.uid);
        await update("posts", docRef.id, uploadDone, urls);

    } catch
        (e) {
        console.log(e)
    }
}

const useAddPost = () => {
    return {addPost, isPending, uploadDone, urls}
}

export default useAddPost