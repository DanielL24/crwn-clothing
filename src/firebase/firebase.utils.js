import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {

    apiKey: "AIzaSyAA8PcA8hxQeNvm-czwXcGpsCsxCMZht9U",
    authDomain: "crwn-db-4194b.firebaseapp.com",
    databaseURL: "https://crwn-db-4194b.firebaseio.com",
    projectId: "crwn-db-4194b",
    storageBucket: "crwn-db-4194b.appspot.com",
    messagingSenderId: "486592640210",
    appId: "1:486592640210:web:990ba25168e6b8e436a90b",
    measurementId: "G-44HEWMEFTK"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({displayName, email, createdAt, ...additionalData});    
        } catch (error) {
            console.log("error creating user", error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

