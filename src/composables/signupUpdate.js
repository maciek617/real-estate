import {updateProfile} from "firebase/auth";
import {auth, db} from "@/firebase/config";
import {doc, serverTimestamp, setDoc} from "firebase/firestore";



const updateProfileOnSignup = async (displayName, error, isPending, res) => {
    error.value = null;
    isPending.value = true;

    const update = await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: 'https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    });


    await setDoc(doc(db, "users", auth.currentUser.uid), {
        id: auth.currentUser.uid,
        name: displayName,
        photo: auth.currentUser.photoURL,
        bg_photo: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        email: auth.currentUser.email,
        bio: 'Update your bio',
        jobTitle: {
            display: true,
            title: 'Add job title title'
        },
        location: 'Add location',
        social_links: [{
            fb: 'Add Facebook',
            ig: 'Add Instagram',
            web: 'Add Website'
        }],
        joinDate: serverTimestamp()
    });


    if (!res && !update) {
        isPending.value = false;
        error.value = 'Could not finish. Try again!'
    }

    isPending.value = false;
    error.value = null;
}


export default updateProfileOnSignup