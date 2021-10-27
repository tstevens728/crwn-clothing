import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config = {
    apiKey: "AIzaSyAdIbLP5lf6i4LsBRaDbPw3CY8wRQTF52Y",
    authDomain: "crwn-db-1fff0.firebaseapp.com",
    projectId: "crwn-db-1fff0",
    storageBucket: "crwn-db-1fff0.appspot.com",
    messagingSenderId: "519552509713",
    appId: "1:519552509713:web:7abd944d0d4e05e7c98eb0",
    measurementId: "G-ETMBGND60L"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }   catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;