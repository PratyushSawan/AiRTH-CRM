import firebase from "firebase"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBKYR9WM7ErQkCobMF8up_Y9vewLa-YXsg",
    authDomain: "airth-dev.firebaseapp.com",
    projectId: "airth-dev",
    storageBucket: "airth-dev.appspot.com",
    messagingSenderId: "967045466401",
    appId: "1:967045466401:web:91619f66b24ae0d98b1660"
})

export const auth = app.auth()
export const db = app.firestore()
export const provider = new firebase.auth.GoogleAuthProvider();
export default app
