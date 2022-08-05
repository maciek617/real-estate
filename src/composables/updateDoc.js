import { doc, updateDoc } from "firebase/firestore";
import {db} from '@/firebase/config';
import {ref} from "vue";

const isPending = ref(false)

const updateDocument = async (id, data) => {
    isPending.value = true;
    const docID = doc(db, "users", id);
    await updateDoc(docID, {
        name: data.name,
        photo: data.photo === '' ? 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' : data.photo,
        bg_photo: data.bg_photo === '' ? 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' : data.bg_photo,
        bio: data.bio,
        jobTitle: {
            display: data.jobTitle.display,
            title: data.jobTitle.title
        },
        location: data.location,
        social_links: [{
            fb: data.social_links[0].fb,
            ig: data.social_links[0].ig,
            web: data.social_links[0].web
        }],
    });
    isPending.value = false;
}

const useUpdateDocument = () => {
    return {updateDocument, isPending}
}

export default useUpdateDocument