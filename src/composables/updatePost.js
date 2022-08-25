import {doc, updateDoc} from "firebase/firestore";
import {db} from '@/firebase/config'


const updatePost = async (id, data, category, quality, owner) => {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
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
        images: data.images,
        main_photo: data.main_photo
    });
}

export default updatePost