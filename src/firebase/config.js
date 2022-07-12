import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDmyRJwBq1LyWsBYkBe-L0By-NtAz-Roug",
    authDomain: "findstate-ff7b3.firebaseapp.com",
    projectId: "findstate-ff7b3",
    storageBucket: "findstate-ff7b3.appspot.com",
    messagingSenderId: "949522202400",
    appId: "1:949522202400:web:21d241b92d78e975462145"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth}